import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Dijkstra from './algorithms/Dijkstra';
import JobSequencing from './algorithms/JobSequencing';
import NQueens from './algorithms/NQueens';
import Knapsack from './algorithms/Knapsack';
import BFS from './algorithms/BFS';
import DFS from './algorithms/DFS';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dijkstra" element={<Dijkstra />} />
      <Route path="/jobsequencing" element={<JobSequencing />} />
      <Route path="/nqueens" element={<NQueens />} />
      <Route path="/knapsack" element={<Knapsack />} />
      <Route path="/bfs" element={<BFS />} />
      <Route path="/dfs" element={<DFS />} />
    </Routes>
  </BrowserRouter>
);
