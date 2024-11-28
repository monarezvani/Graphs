import { getGraphs, getGraphsById, deleteGraphById, createGraph } from "../services/api";
import { Graph } from "../lib//types";

describe("Graph API unit testing", () => {
    let initialGraphs: Graph[];

    // Backup and restore the initial state of the graphs array
    beforeEach(async () => {
        initialGraphs = await getGraphs(); // Store a backup of the original state
    });

    afterEach(() => jest.resetModules());

    it("should fetch all graphs", async () => {
        const graphs = await getGraphs();
        expect(graphs).toHaveLength(initialGraphs.length);
        expect(graphs).toBeInstanceOf(Array);
    });

    it("should fetch a graph by ID", async () => {
        const graph = await getGraphsById("grph_1");
        expect(graph).toBeDefined();
        expect(graph?.id).toBe("grph_1");
        expect(graph?.name).toBe("Graph 1");
    });

    it("should return undefined for a non-existent graph ID", async () => {
        const graph = await getGraphsById("nonexistent");
        expect(graph).toBeUndefined();
    });

    it("should delete a graph by ID", async () => {
        const idToDelete = "grph_1";
        await deleteGraphById(idToDelete);
        const graphs = await getGraphs();
        expect(graphs).toHaveLength(initialGraphs.length - 1);
        expect(graphs.find(graph => graph.id === idToDelete)).toBeUndefined();
    });

    it("should create a new graph", async () => {
        const newGraphName = "new-graph";
        const newGraph = await createGraph(newGraphName);

        const graphs = await getGraphs();
        expect(graphs).toHaveLength(initialGraphs.length); //it has the initialGraphs length because we remove a graph from it in the previous test;
        expect(graphs.find(graph => graph.name === newGraphName)).not.toBeUndefined();
        expect(newGraph.name).toBe(newGraphName);
        expect(newGraph.data.nodes).toHaveLength(0);
        expect(newGraph.data.edges).toHaveLength(0);
    });
});
