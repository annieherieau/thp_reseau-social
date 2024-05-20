import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="thp_reseau-social">
        <App />
    </BrowserRouter>
  </React.StrictMode>
);
