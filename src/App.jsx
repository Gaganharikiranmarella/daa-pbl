// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './Home';

// Import your algorithm components
import Dijkstra from './algorithms/Dijkstra';
import JobSequencing from './algorithms/JobSequencing';
import NQueens from './algorithms/NQueens';
import Knapsack from './algorithms/Knapsack';
import Kruskal from './algorithms/Kruskal';
import Prims from './algorithms/Prims';
import BFS from './algorithms/BFS';
import DFS from './algorithms/DFS';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dijkstra" element={<Dijkstra />} />
      <Route path="/jobsequencing" element={<JobSequencing />} />
      <Route path="/nqueens" element={<NQueens />} />
      <Route path="/knapsack" element={<Knapsack />} />
      <Route path="/kruskal" element={<Kruskal />} />
      <Route path="/prims" element={<Prims />} />
      <Route path="/bfs" element={<BFS />} />
      <Route path="/dfs" element={<DFS />} />
    </Routes>
  );
}

export default App;
