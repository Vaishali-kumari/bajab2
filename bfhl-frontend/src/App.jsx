import { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setResponse(null);

    try {
      const res = await axios.post(
        "https://your-api-url/bfhl", 
        {
          data: input.split(",").map((item) => item.trim()),
        }
      );

      setResponse(res.data);
    } catch (err) {
      setError("API call failed. Please check your server.");
    }
  };

  return (
    <div className="container">
      <h1>BFHL Tree Analyzer</h1>

      <textarea
        placeholder="Enter nodes (comma separated)..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>

      {error && <p className="error">{error}</p>}

      {response && (
        <div className="response">
          <h2> API Response</h2>

          {Object.entries(response).map(([key, value]) => (
            <div key={key} className="card">
              <h3>{key}</h3>
              <pre>{JSON.stringify(value, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}