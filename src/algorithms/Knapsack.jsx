// src/algorithms/Knapsack.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Knapsack() {
  const [capacity, setCapacity] = useState("");
  const [itemsInput, setItemsInput] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const clearFields = () => {
    setCapacity("");
    setItemsInput("");
    setResult(null);
  };

  const handleRun = () => {
    /*
      Input format: each line "weight value"
      Example:
      2 12
      1 10
      3 20
      2 15
    */
    if (!capacity || capacity <= 0) {
      alert("Enter valid capacity");
      return;
    }

    const lines = itemsInput.trim().split("\n");
    const items = lines.map((line) => {
      const parts = line.trim().split(" ");
      if (parts.length !== 2) return null;
      return { weight: Number(parts[0]), value: Number(parts[1]) };
    });

    if (items.includes(null)) {
      alert("Each line must have weight and value");
      return;
    }

    const n = items.length;
    const W = Number(capacity);

    // Initialize DP array
    const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= W; w++) {
        if (items[i - 1].weight <= w) {
          dp[i][w] = Math.max(
            dp[i - 1][w],
            dp[i - 1][w - items[i - 1].weight] + items[i - 1].value
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    setResult({ maxValue: dp[n][W], dp });
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>0/1 Knapsack Problem</h2>

      <input
        type="number"
        placeholder="Enter capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        style={{ width: "100%", padding: 10, fontSize: 16, marginBottom: 10 }}
      />

      <textarea
        placeholder="Enter items: weight value"
        rows={8}
        style={{ width: "100%", fontSize: 14, padding: 10 }}
        value={itemsInput}
        onChange={(e) => setItemsInput(e.target.value)}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={handleRun} style={{ marginRight: 10, padding: "10px 20px" }}>
          Run
        </button>
        <button onClick={clearFields} style={{ padding: "10px 20px" }}>
          Clear
        </button>
        <button onClick={() => navigate("/")} style={{ padding: "10px 20px" }}>
          Back
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Maximum Value: {result.maxValue}</h3>
          <h4>DP Table:</h4>
          <table
            border="1"
            style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>i\w</th>
                {[...Array(Number(capacity) + 1)].map((_, i) => (
                  <th key={i}>{i}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.dp.map((row, i) => (
                <tr key={i}>
                  <td>{i}</td>
                  {row.map((val, j) => (
                    <td key={j}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
