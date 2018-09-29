import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import "./index.css";
import Auth from './auth/Auth.js';

const auth = new Auth();
auth.login();

 
// ReactDOM.render(
//   <Main/>, 
//   document.getElementById("root")
// );