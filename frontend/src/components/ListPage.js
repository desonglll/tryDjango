import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { ListItem, List } from "@mui/material";
import { BrowserRouter as Router, Link } from "react-router-dom";

function ListPage() {
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
    <Router>
      <div className="ListPage">
        <h1>Hello from React with Material-UI</h1>
        <Button variant="contained" color="primary">
          Click me
        </Button>
        <h1>Your React Component</h1>
        <List component="nav" aria-label="mailbox folders">
          {data && (
            <ul>
              {data.map((item) => (
                <ListItem key={item.id} button divider>
                  <Link to={`/product/${item.id}`}>
                    <strong>Title:</strong> {item.title},{" "}
                    <Button>Press me to detail page</Button>
                  </Link>
                  <strong>Description:</strong> {item.description},{" "}
                </ListItem>
              ))}
            </ul>
          )}
        </List>
      </div>
    </Router>
  );
}

export default ListPage;
