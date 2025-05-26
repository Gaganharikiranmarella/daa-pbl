// src/algorithms/NQueens.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NQueens() {
  const [n, setN] = useState(4);
  const [solutions, setSolutions] = useState([]);
  const navigate = useNavigate();

  const clearFields = () => {
    setN(4);
    setSolutions([]);
  };

  const isSafe = (board, row, col, n) => {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i] === col) return false;
    }

    // Check diagonals
    for (let i = 0; i < row; i++) {
      if (Math.abs(board[i] - col) === row - i) return false;
    }
    return true;
  };

  const solve = (row, board, n, result) => {
    if (row === n) {
      result.push([...board]);
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isSafe(board, row, col, n)) {
        board[row] = col;
        solve(row + 1, board, n, result);
      }
    }
  };

  const handleRun = () => {
    if (n < 1) {
      alert("N must be >= 1");
      return;
    }

    const result = [];
    solve(0, Array(n).fill(-1), n, result);
    setSolutions(result);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>N Queens Problem</h2>
      <input
        type="number"
        value={n}
        min={1}
        onChange={(e) => setN(Number(e.target.value))}
        style={{ width: "100%", padding: 10, fontSize: 16 }}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={handleRun} style={{ marginRight: 10, padding: "10px 20px" }}>
          Run
        </button>
        <button onClick={clearFields} style={{ marginRight: 10, padding: "10px 20px" }}>
          Clear
        </button>
        <button onClick={() => navigate("/")} style={{ padding: "10px 20px" }}>
          Back
        </button>
      </div>

      {solutions.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Found {solutions.length} solutions</h3>
          {solutions.map((board, idx) => (
            <div key={idx} style={{ marginBottom: 20 }}>
              <strong>Solution {idx + 1}:</strong>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${n}, 30px)` }}>
                {board.map((col, row) => (
                  <div
                    key={row}
                    style={{
                      width: 30,
                      height: 30,
                      border: "1px solid black",
                      backgroundColor: col === row ? "black" : "#eee",
                    }}
                  >
                    {col === row ? "Q" : ""}
                  </div>
                ))}
              </div>
              {/* Correct display of queens: place Q in correct col */}
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${n}, 30px)` }}>
                {[...Array(n * n)].map((_, i) => {
                  const r = Math.floor(i / n);
                  const c = i % n;
                  return (
                    <div
                      key={i}
                      style={{
                        width: 30,
                        height: 30,
                        border: "1px solid black",
                        backgroundColor: board[r] === c ? "#555" : "#eee",
                        color: "white",
                        textAlign: "center",
                        lineHeight: "30px",
                      }}
                    >
                      {board[r] === c ? "Q" : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
