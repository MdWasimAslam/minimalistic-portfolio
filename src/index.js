import React from "react";
import ReactDOM from "react-dom/client";

// Fonts (Inter + Fira Code) are loaded via <link> in public/index.html.
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
