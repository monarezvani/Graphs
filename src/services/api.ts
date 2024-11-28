import { Graph } from "../lib/types";

// Initialize mock graph data
let graphs: Graph[] = [
    {
        id: "grph_1",
        name: "Graph 1",
        data: {
            nodes: [
                { id: "nd_1", label: "Node 1" },
                { id: "nd_2", label: "Node 2" },
                { id: "nd_3", label: "Node 3" },
                { id: "nd_4", label: "Node 4" },
            ],
            edges: [
                { source: "nd_1", target: "nd_2" },
                { source: "nd_1", target: "nd_3" },
                { source: "nd_1", target: "nd_4" },
            ],
        },
    },
    {
        id: "grph_2",
        name: "Graph 2",
        data: {
            nodes: [
                { id: "nd_1", label: "Node 1" },
                { id: "nd_2", label: "Node 2" },
            ],
            edges: [{ source: "nd_1", target: "nd_2" }],
        },
    },
    {
        id: "grph_3",
        name: "Graph 3",
        data: {
            nodes: [
                { id: "nd_1", label: "Node 1" },
                { id: "nd_2", label: "Node 2" },
                { id: "nd_3", label: "Node 3" },
                { id: "nd_4", label: "Node 4" },
                { id: "nd_5", label: "Node 5" },
                { id: "nd_6", label: "Node 6" },
            ],
            edges: [
                { source: "nd_1", target: "nd_2" },
                { source: "nd_1", target: "nd_3" },
                { source: "nd_1", target: "nd_4" },
                { source: "nd_1", target: "nd_5" },
            ],
        },
    },
];

// Fetch list of graphs
export const getGraphs = async (): Promise<Graph[]> => {
    return new Promise(resolve => setTimeout(() => resolve(graphs), 500));
};

// Return a specific graph by graph ID
export const getGraphsById = async (id: string): Promise<Graph | undefined> => {
    return new Promise(resolve =>
        setTimeout(() => resolve(graphs.find(graph => graph.id === id)), 500)
    );
};

//Delete a specific graph by graph ID
export const deleteGraphById = async (id: string): Promise<void> => {
    return new Promise(resolve => {
        graphs = graphs.filter(graph => graph.id !== id);
        setTimeout(() => resolve(), 500);
    });
};

// Create a new Graph
export const createGraph = async (name: string): Promise<Graph> => {
    return new Promise(resolve => {
        const newGraph: Graph = {
            id: Date.now().toString(),
            data: { nodes: [], edges: [] },
            name,
        };

        graphs.push(newGraph);
        setTimeout(() => resolve(newGraph), 500);
    });
};
