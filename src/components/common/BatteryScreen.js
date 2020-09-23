import React, {Component} from 'react';
import SideBar from './CommonComponents/SideBar';
import '../../style/BatteryScreen.css';

export default class BatteryScreen extends Component {
  render() {
    return (
      <div className="battery-screen">
        {/*Head bar*/}
        <div className="battery-screen-head-bar">
          
        </div>

        {/*Side bar*/}
        <div className="side-bar-area">
          <SideBar fromScreen="BatteryScreen"/>
        </div>

        {/*Main area*/}
        <div className="battery-area">
          Battery Screen
        </div>
      </div>
    );
  }  
}