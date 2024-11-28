import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GraphList from "./pages/GraphList";
import GraphView from "./pages/GraphView";

function App() {
    return (
        <Router>
            <Routes>
                <Route index path="/" element={<GraphList />} />
                <Route path="/graph/:id" element={<GraphView />} />
            </Routes>
        </Router>
    );
}

export default App;
