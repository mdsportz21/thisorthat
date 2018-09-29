import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import Home from './Home';
import Callback from './callback/Callback';
import Auth from './auth/Auth';
import history from './history';
import BracketComponent from './BracketComponent';
import Login from './Login';
import Rankings from './Rankings';
import Deduper from './Deduper';

const auth = new Auth();

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route exact path="/" render={(props) => (
          !auth.isAuthenticated() ?
            (
              <Login auth={auth} {...props} />
            ) :
            (
              <Redirect to="/home" />
            )
        )} />
        <Route path="/home" render={(props) => (
          !auth.isAuthenticated() ?
            (
              <Redirect to="/" />
            ) :
            (
              <Home auth={auth} {...props} />
            )
        )} />
        <Route path="/bracket" render={(props) => <BracketComponent auth={auth} {...props} />} />
        <Route path="/rankings" component={Rankings} />
        <Route path="/dedupe" component={Deduper} />
        <Route path="/callback" render={(props) => {
          // handleAuthentication(props);
          return <Callback auth={auth} {...props} />
        }} />
      </div>
    </Router>
  );
}