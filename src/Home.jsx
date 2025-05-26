// src/Home.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { keywordMap } from './keywords';
import './App.css';

function Home() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleGenerate = () => {
    const lowerPrompt = prompt.toLowerCase();
    for (const [route, keywords] of Object.entries(keywordMap)) {
      if (keywords.some(keyword => lowerPrompt.includes(keyword))) {
        navigate(`/${route}`);
        return;
      }
    }
    alert('No matching algorithm found.');
  };

  return (
    <div className="app-container">
      <h1>DAA Algorithm Identifier</h1>
      <textarea
        placeholder="Type your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={6}
        cols={50}
      />
      <br />
      <button onClick={handleGenerate}>Generate</button>
    </div>
  );
}

export default Home;
