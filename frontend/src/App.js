
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState({});

  const handleSearch = async () => {
    const response = await axios.get(`/search?query=${query}`);
    setResults(response.data);
  };

  const handleAnalyze = async () => {
    const response = await axios.post('/analyze', { text });
    setAnalysis(response.data);
  };

  return (
    <div>
      <h1>DorkSearch</h1>
      <div>
        <TextField value={query} onChange={e => setQuery(e.target.value)} label="Search Query" />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div>
        {results.map(result => (
          <div key={result.cacheId}>
            <h3>{result.title}</h3>
            <p>{result.snippet}</p>
            <a href={result.link}>Read more</a>
          </div>
        ))}
      </div>
      <div>
        <TextField value={text} onChange={e => setText(e.target.value)} label="Text to Analyze" />
        <Button onClick={handleAnalyze}>Analyze</Button>
      </div>
      <div>
        <pre>{JSON.stringify(analysis, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
