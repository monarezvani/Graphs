export interface Graph {
    id: string;
    name: string;
    data: Data;
}

export interface Data {
    nodes: Node[];
    edges: Edge[];
}

export interface Edge {
    source: string;
    target: string;
}

export interface Node {
    id: string;
    label: string;
}
