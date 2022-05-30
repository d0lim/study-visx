import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ScatterChartContainer from "./container/scatter-chart.container";
import { Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/scatter-chart-container">ScatterChartContainer</Link>
      </nav>
    </div>
  );
}

export default App;
