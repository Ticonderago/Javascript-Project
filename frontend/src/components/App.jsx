import React from "react";
import '../stylesheets/main_css';
import Canvas from "./canvas/canvas";
import { Route } from "react-router-dom";

const App = () => (
  <div className="app-container">
    <Route exact={true} path="/" component={Canvas} />
  </div>
);

export default App;