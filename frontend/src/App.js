import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { ListItem, List, ListItemText, Divider } from "@mui/material";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/data/");
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
      <List component="nav" aria-label="mailbox folders">
        {data && (
          <ul>
            {data.map((item) => (
              <ListItem button divider>
                <strong>Title:</strong> {item.title},{" "}
                <strong>Description:</strong> {item.description},{" "}
                {/* <strong>Description:</strong> {item.description},{" "}
              <strong>Price:</strong> {item.price} */}
              </ListItem>
            ))}
          </ul>
        )}
      </List>
    </div>
  );
}

export default App;
