import React, {Component} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import BasicInfoScreen from './BasicInfoScreen';


export default class App extends Component {
    
  render() {
    return (
      <div>
        <BasicInfoScreen />
      </div>
    );
  }
}