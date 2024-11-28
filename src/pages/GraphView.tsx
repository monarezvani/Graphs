import React, { useCallback, useState } from "react";
import ReactFlow, {
    Background,
    Controls,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    Node,
    Edge,
    Connection,
    OnNodesChange,
    OnEdgesChange,
} from "reactflow";
import "reactflow/dist/style.css";
import styles from "./GraphView.module.css";

export default function GraphView() {
    const [nodes, setNodes] = useState<Node[]>([
        { id: "1", data: { label: "Node 1" }, position: { x: 250, y: 50 } },
        { id: "2", data: { label: "Node 2" }, position: { x: 150, y: 150 } },
        { id: "3", data: { label: "Node 3" }, position: { x: 350, y: 150 } },
    ]);
    const [edges, setEdges] = useState<Edge[]>([
        { id: "e1-2", source: "1", target: "2" },
        { id: "e1-3", source: "1", target: "3" },
    ]);

    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Handlers for node and edge changes
    const onNodesChange: OnNodesChange = useCallback(
        changes => setNodes(nds => applyNodeChanges(changes, nds)),
        []
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        changes => setEdges(eds => applyEdgeChanges(changes, eds)),
        []
    );
    const onConnect = useCallback(
        (connection: Connection) => setEdges(eds => addEdge(connection, eds)),
        []
    );

    // Add a new node
    const addNode = () => {
        const newNode: Node = {
            id: `node-${nodes.length + 1}`,
            data: { label: `Node ${nodes.length + 1}` },
            position: { x: Math.random() * 400, y: Math.random() * 400 },
        };

        setNodes(nds => [...nds, newNode]);
        if (selectedNode) {
            const newEdge: Edge = {
                id: `e${selectedNode.id}-${newNode.id}`,
                source: selectedNode.id,
                target: newNode.id,
            };
            setEdges(eds => [...eds, newEdge]);
        }
    };

    // Edit selected node
    const editNode = () => {
        if (!selectedNode) return alert("No node selected");
        const newLabel = prompt("Enter new label for the node:", selectedNode.data.label);
        if (newLabel) {
            setNodes(nds =>
                nds.map(node =>
                    node.id === selectedNode.id ? { ...node, data: { label: newLabel } } : node
                )
            );
        }
    };

    // Delete selected node
    const deleteNode = () => {
        if (!selectedNode) return alert("No node selected");
        setNodes(nds => nds.filter(node => node.id !== selectedNode.id));
        setEdges(eds =>
            eds.filter(edge => edge.source !== selectedNode.id && edge.target !== selectedNode.id)
        );
        setSelectedNode(null);
    };

    // Filter nodes based on search term
    const filteredNodes = searchTerm
        ? nodes.filter(node => node.data.label.toLowerCase().includes(searchTerm.toLowerCase()))
        : nodes;

    return (
        <div style={{ height: "100vh", padding: "20px" }}>
            <h1 className={styles.heading}>Graph View</h1>
            <div className={styles.toolbar}>
                <button onClick={addNode}>Add Node</button>
                <button onClick={editNode} disabled={!selectedNode}>
                    Edit Node
                </button>
                <button onClick={deleteNode} disabled={!selectedNode}>
                    Delete Node
                </button>
                <input
                    type="text"
                    placeholder="Search nodes"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            <ReactFlow
                nodes={filteredNodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={(_, node) => setSelectedNode(node)}
                fitView>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}
