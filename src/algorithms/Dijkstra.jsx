// src/algorithms/SingleSourceShortestPath.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

export default function SingleSourceShortestPath() {
  const [graphInput, setGraphInput] = useState("");
  const [source, setSource] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const clearFields = () => {
    setGraphInput("");
    setSource("");
    setResult(null);
  };

  const handleRun = () => {
    /*
      Input format for graphInput: edges as lines "u v w"
      Example:
      0 1 4
      0 2 1
      2 1 2
      1 3 1
      2 3 5
      Source: 0
    */

    const lines = graphInput.trim().split("\n");
    const edges = lines.map((line) => line.trim().split(" ").map(Number));

    if (edges.some((arr) => arr.length !== 3)) {
      alert("Each edge must be 'u v w'");
      return;
    }

    if (source === "") {
      alert("Please enter source vertex");
      return;
    }

    const vertices = new Set();
    edges.forEach(([u, v]) => {
      vertices.add(u);
      vertices.add(v);
    });

    const V = Math.max(...Array.from(vertices)) + 1;

    // Build adjacency list
    const graph = Array.from({ length: V }, () => []);
    edges.forEach(([u, v, w]) => {
      graph[u].push({ node: v, weight: w });
      // Uncomment next if undirected
      // graph[v].push({ node: u, weight: w });
    });

    // Dijkstra's Algorithm
    const dist = Array(V).fill(Infinity);
    dist[source] = 0;

    const visited = Array(V).fill(false);

    for (let i = 0; i < V; i++) {
      let u = -1;
      let minDist = Infinity;
      for (let v = 0; v < V; v++) {
        if (!visited[v] && dist[v] < minDist) {
          minDist = dist[v];
          u = v;
        }
      }

      if (u === -1) break;
      visited[u] = true;

      for (const { node: v, weight } of graph[u]) {
        if (!visited[v] && dist[u] + weight < dist[v]) {
          dist[v] = dist[u] + weight;
        }
      }
    }

    setResult(dist);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Single Source Shortest Path (Dijkstra)</h2>

      <textarea
        placeholder="Enter edges (u v w) per line"
        rows={8}
        style={{ width: "100%", fontSize: 14, padding: 10 }}
        value={graphInput}
        onChange={(e) => setGraphInput(e.target.value)}
      />

      <input
        type="number"
        placeholder="Source vertex"
        value={source}
        onChange={(e) => setSource(Number(e.target.value))}
        style={{ width: "100%", padding: 10, marginTop: 10, fontSize: 16 }}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={handleRun} style={{ marginRight: 10, padding: "10px 20px" }}>
          Run
        </button>
        <button onClick={clearFields} style={{ padding: "10px 20px", marginRight: 10 }}>
          Clear
        </button>
        <button onClick={() => navigate("/")} style={{ padding: "10px 20px" }}>
          Back
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Shortest Distances from source {source}:</h3>
          <ul>
            {result.map((d, i) => (
              <li key={i}>
                Vertex {i} : {d === Infinity ? "∞" : d}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
