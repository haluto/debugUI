import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../components/common/history';

import App from '../components/common/App';
import NoMatch from '../components/common/404';

class MRoute extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={App}/>
          <Route path="/debugUI" component={App}/>
          <Route component={NoMatch}/>
        </Switch>
      </Router>
    );
  }
}

export default MRoute;