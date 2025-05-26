// src/algorithms/JobSequencing.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JobSequencing() {
  const [jobsInput, setJobsInput] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const clearFields = () => {
    setJobsInput("");
    setResult(null);
  };

  const handleRun = () => {
    /*
      Input format: each line "jobId deadline profit"
      Example:
      1 2 100
      2 1 19
      3 2 27
      4 1 25
      5 3 15
    */

    const lines = jobsInput.trim().split("\n");
    const jobs = lines.map((line) => {
      const parts = line.trim().split(" ");
      if (parts.length !== 3) return null;
      return { id: parts[0], deadline: Number(parts[1]), profit: Number(parts[2]) };
    });

    if (jobs.includes(null)) {
      alert("Each line must have jobId deadline profit");
      return;
    }

    // Sort jobs by profit descending
    jobs.sort((a, b) => b.profit - a.profit);

    const maxDeadline = Math.max(...jobs.map((j) => j.deadline));
    const resultSlots = Array(maxDeadline).fill(null);

    let totalProfit = 0;
    const selectedJobs = [];

    for (const job of jobs) {
      for (let slot = job.deadline - 1; slot >= 0; slot--) {
        if (resultSlots[slot] === null) {
          resultSlots[slot] = job.id;
          totalProfit += job.profit;
          selectedJobs.push(job);
          break;
        }
      }
    }

    setResult({ selectedJobs, totalProfit, schedule: resultSlots });
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Job Sequencing with Deadlines</h2>
      <textarea
        rows={8}
        placeholder="Enter jobs: jobId deadline profit"
        style={{ width: "100%", fontSize: 14, padding: 10 }}
        value={jobsInput}
        onChange={(e) => setJobsInput(e.target.value)}
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

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Scheduled Jobs (by slot):</h3>
          <ul>
            {result.schedule.map((jobId, i) => (
              <li key={i}>
                Slot {i + 1}: {jobId || "Empty"}
              </li>
            ))}
          </ul>
          <h3>Total Profit: {result.totalProfit}</h3>
          <h4>Selected Jobs:</h4>
          <ul>
            {result.selectedJobs.map((job) => (
              <li key={job.id}>
                Job {job.id} - Deadline: {job.deadline}, Profit: {job.profit}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
