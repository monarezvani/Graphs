# Graph Management App

A React application for managing graphs with features to add, edit, delete, and search nodes. The application uses **React Flow** for visualizing graph data and supports dynamic interactions with nodes and edges.

## Features

- **Graph List Page**:
  - View all graphs.
  - Create, delete, and search graphs by name.
  - Navigate to individual graph view pages.

- **Graph View Page**:
  - Visualize graphs using **React Flow**.
  - Add, edit, and delete nodes dynamically.
  - Search nodes by name.
  - Interactive zoom, pan, and drag functionality.

## Tech Stack

- **React**: Frontend framework.
- **React Router**: For navigation and routing.
- **React Flow**: For graph visualization and interactions.
- **TypeScript**: For type safety and code maintainability.
- **CSS Modules**: For modular and scoped styling.

## Folder Structure

src/
├── components/       # Reusable React components
├── pages/            # Main pages (GraphList, GraphView)
├── services/         # API services for graph data
├── styles/           # CSS modules
└── tests/            # Unit tests
