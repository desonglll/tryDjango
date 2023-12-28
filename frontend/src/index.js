import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ListPage from "./components/ListPage";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div>
      <App />
      <ListPage />
    </div>
  </React.StrictMode>
);

reportWebVitals();
