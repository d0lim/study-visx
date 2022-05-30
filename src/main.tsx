import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ScatterChartContainer from "./container/scatter-chart.container";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="scatter-chart-container"
          element={<ScatterChartContainer width={600} height={400} />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
