import React, { Component } from 'react';
import {
  NavLink,
  HashRouter,
} from 'react-router-dom';

class Nav extends Component {
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
        </div>
      </HashRouter>
    );
  }
}

export default Nav;
