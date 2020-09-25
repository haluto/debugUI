import React, {Component} from 'react';
import SideBar from './CommonComponents/SideBar';
import BatteryInfoPanel from '../BatteryScreen/BatteryInfoPanel';
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
          <BatteryInfoPanel />
        </div>
      </div>
    );
  }  
}