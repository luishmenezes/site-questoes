import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./RouterConfig";
import "antd/dist/reset.css";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <Router>
        <RouterConfig />
      </Router>
    </div>
  );
}

export default App;
