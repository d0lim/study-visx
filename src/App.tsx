import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ScatterChartContainer from "./container/scatter-chart.container";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <ScatterChartContainer width={600} height={400} />
    </div>
  );
}

export default App;
