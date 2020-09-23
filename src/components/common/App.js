import React, {Component} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import BasicInfoScreen from './BasicInfoScreen';
import BatteryScreen from './BatteryScreen';


export default class App extends Component {
    
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={BasicInfoScreen}/>
          <Route exact path="/debugUI" component={BasicInfoScreen}/>
          <Route path="/debugUI/basicinfoscreen" component={BasicInfoScreen}/>
          <Route path="/debugUI/batteryscreen" component={BatteryScreen}/>
        </Switch>  
      </Router>
    );
  }
}