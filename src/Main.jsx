import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter,
} from 'react-router-dom';
import Home from './Home';
import BracketComponent from './BracketComponent';
import Rankings from './Rankings';
import Deduper from './Deduper';

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/bracket" component={BracketComponent} />
          <Route path="/rankings" component={Rankings} />
          <Route path="/dedupe" component={Deduper} />
        </div>
      </HashRouter>
    );
  }
}

export default Main;
