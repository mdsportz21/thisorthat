import React from "react";
import ReactDOM from "react-dom";
import Nav from "./Nav";
import "./index.css";
import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();

ReactDOM.render(
  <div>
    <Nav />
    {routes}
  </div>,
  document.getElementById("root")
);