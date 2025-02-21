import { useState } from "react";
import Select from "react-select";
import axios from "axios";

const options = [
  { value: "numbers", label: "Numbers" },
  { value: "alphabets", label: "Alphabets" },
  { value: "highest_alphabet", label: "Highest Alphabet" },
];

function App() {
  const [jsonInput, setJsonInput] = useState(
    '{"data": ["M","1","334","4","B"]}'
  );
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        setError("Invalid JSON format. Ensure 'data' is an array.");
        return;
      }
      setError("");
      const res = await axios.post("http://localhost:5000/bfhl", parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError("Invalid JSON input.");
    }
  };

  const filteredResponse = response
    ? Object.fromEntries(
        Object.entries(response).filter(([key]) =>
          selectedFilters.some((filter) => filter.value === key)
        )
      )
    : {};

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">API Input</h1>
      <textarea
        className="w-full p-2 border rounded"
        rows="3"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {response && (
        <div className="mt-6">
          <h2 className="text-lg font-bold">Multi Filter</h2>
          <Select
            options={options}
            isMulti
            onChange={setSelectedFilters}
            className="mt-2"
          />

          <div className="mt-4 p-4 border rounded">
            <h3 className="font-bold">Filtered Response</h3>
            {Object.entries(filteredResponse).map(([key, value]) => (
              <p key={key}>
                <strong>{key.replace("_", " ")}: </strong>
                {value.length ? value.join(", ") : "None"}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
