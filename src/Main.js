import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import BracketComponent from "./BracketComponent";
import Rankings from "./Rankings";
import Deduper from "./Deduper";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Brack It</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/bracket">Bracket</NavLink></li>
            <li><NavLink to="/rankings">Rankings</NavLink></li>
            <li><NavLink to="/dedupe">Duplicates</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/bracket" component={BracketComponent}/>
            <Route path="/rankings" component={Rankings}/>
            <Route path="/dedupe" component={Deduper}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;