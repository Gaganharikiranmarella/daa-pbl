import { Routes, Route } from 'react-router-dom';
import Home from './Home';

// ✅ Import only the correct algorithm components
import Dijkstra from './algorithms/Dijkstra';
import JobSequencing from './algorithms/JobSequencing';
import Knapsack from './algorithms/Knapsack';
import NQueens from './algorithms/NQueens';
import BFS from './algorithms/BFS';
import DFS from './algorithms/DFS';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dijkstra" element={<Dijkstra />} />
      <Route path="/jobsequencing" element={<JobSequencing />} />
      <Route path="/knapsack" element={<Knapsack />} />
      <Route path="/nqueens" element={<NQueens />} />
      <Route path="/bfs" element={<BFS />} />
      <Route path="/dfs" element={<DFS />} />
    </Routes>
  );
}

export default App;
