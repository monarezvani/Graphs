import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Graph } from "../lib/types";
import { createGraph, deleteGraphById, getGraphs } from "../services/api";
import styles from "./GraphList.module.css";

export default function GraphList() {
    const navigate = useNavigate();
    const [graphs, setGraphs] = useState<Graph[]>([]);
    const [filter, setFilter] = useState("");
    const [newGraphName, setNewGraphName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    console.log(graphs);
    const fetchGraphsData = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const graphsData = await getGraphs();
            setGraphs(graphsData);
        } catch (err) {
            setError("Failed to fetch graphs. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGraphsData();
    }, [fetchGraphsData]);

    const handleCreateGraph = async () => {
        if (!newGraphName.trim()) {
            alert("Graph name cannot be empty!");
            return;
        }

        try {
            await createGraph(newGraphName);
            setNewGraphName("");
        } catch (err) {
            alert("Failed to create graph. Please try again.");
        }
    };

    const handleDeleteGraph = async (id: string) => {
        try {
            await deleteGraphById(id);
            setGraphs(prev => prev.filter(graph => graph.id !== id));
        } catch (err) {
            alert("Failed to delete graph. Please try again.");
        }
    };

    const filteredGraphs = graphs.filter(graph =>
        graph.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Graph List</h1>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.inputGroup}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Filter by name"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
            </div>

            {loading ? (
                <div className={styles.emptyState}>Loading graphs...</div>
            ) : filteredGraphs.length === 0 ? (
                <div className={styles.emptyState}>No graphs found.</div>
            ) : (
                <ul className={styles.list}>
                    {filteredGraphs.map(graph => (
                        <li key={graph.id} className={styles.listItem}>
                            {graph.name}
                            <div className={styles.actionButtons}>
                                <button
                                    className={styles.actionButton}
                                    onClick={() => navigate(`/graph/${graph.id}`)}>
                                    View
                                </button>
                                <button
                                    className={`${styles.actionButton} ${styles.delete}`}
                                    onClick={() => handleDeleteGraph(graph.id)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className={styles.inputGroup}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="New graph name"
                    value={newGraphName}
                    onChange={e => setNewGraphName(e.target.value)}
                />
                <button className={styles.button} onClick={handleCreateGraph}>
                    Add Graph
                </button>
            </div>
        </div>
    );
}
