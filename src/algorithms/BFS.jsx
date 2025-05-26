import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function BFS() {
  const [graph, setGraph] = useState('');
  const [startNode, setStartNode] = useState('');
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  const handleBack = () => navigate('/');
  const handleClear = () => {
    setGraph('');
    setStartNode('');
    setResult('');
  };

  const handleBFS = () => {
    // Add actual BFS logic here if needed
    setResult('BFS result placeholder...');
  };

  return (
    <div className="algorithm-container">
      <div className="top-buttons">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      <h2>Breadth-First Search (BFS)</h2>
      <textarea
        placeholder="Enter adjacency list (e.g., A:B,C; B:D; C:D)"
        value={graph}
        onChange={(e) => setGraph(e.target.value)}
        rows={5}
        cols={50}
      />
      <br />
      <input
        type="text"
        placeholder="Start Node"
        value={startNode}
        onChange={(e) => setStartNode(e.target.value)}
      />
      <br />
      <button onClick={handleBFS}>Run BFS</button>

      <div>
        <h3>Output:</h3>
        <p>{result}</p>
      </div>
    </div>
  );
}

export default BFS;
