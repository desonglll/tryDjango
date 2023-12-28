import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/data/");
      console.log("Full Response:", response);
      const jsonData = await response.json();
      console.log("Parsed JSON:", jsonData);
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Hello from React with Material-UI</h1>
      <Button variant="contained" color="primary">
        Click me
      </Button>
      <h1>Your React Component</h1>
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <strong>Title:</strong> {item.title},{" "}
              {/* <strong>Description:</strong> {item.description},{" "}
              <strong>Price:</strong> {item.price} */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
