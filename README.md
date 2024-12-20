# SPath

## Requirements
- Node.js (>=14.x)
- npm or yarn
- Modern web browser

## Setup Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/RadouaneBaba/spath
   ```

2. Navigate to the project directory:
   ```bash
   cd <project-folder>
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
   or if using yarn:
   ```bash
   yarn install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   or if using yarn:
   ```bash
   yarn dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Project Features
- Interactive graph visualization.
- Implementation of the Bellman-Ford algorithm with edge highlighting.
- Node and edge manipulation (add, delete, update).

## Usage
1. Add nodes and edges to the graph using the interactive interface.
2. Select source and destination nodes.
3. Run the Bellman-Ford algorithm to compute shortest paths.
4. Visual feedback through color-coded edge highlighting:
   - Yellow: Edges being processed.
   - Green: Edges that are part of the shortest path.

## Customization
- Modify graph styles in the `options` object.
- Update node and edge data dynamically via the interface or code.

## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add my feature"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/my-feature
   ```
5. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgments
- [vis-network](https://visjs.github.io/vis-network/) for graph visualization.
- Tailwind CSS for styling components.
- React for the interactive interface.


