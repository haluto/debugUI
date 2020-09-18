import React, {Component} from 'react';
import SideBar from './CommonComponents/SideBar';
import DeviceChooserPanel from '../BasicInfoScreen/DeviceChooserPanel';
import '../../style/BasicInfoScreen.css';

export default class BasicInfoScreen extends Component {

  render() {
    return (
      <div className="basicInfo-screen">

        {/*Head bar*/}
        <div className="basicInfo-screen-head-bar">
          
        </div>

        {/*Side bar*/}
        <div className="side-bar-area">
          <SideBar fromScreen="BasicInfoScreen"/>
        </div>

        {/*Main area*/}
        <div className="basicInfo-area">
          <DeviceChooserPanel />
        </div>

      </div>
    );
  }
}