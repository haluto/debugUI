import React, {Component} from 'react';
import SideBar from './CommonComponents/SideBar';
import DeviceChooserPanel from '../BasicInfoScreen/DeviceChooserPanel';
import DeviceControlPanel from '../BasicInfoScreen/DeviceControlPanel';
import '../../style/BasicInfoScreen.css';

export default class BasicInfoScreen extends Component {
  state = {
    selectedDevice: '',
  };

  handleDeviceSelected = (device) => {
    this.setState({
      selectedDevice: device
    });
  }

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
          <DeviceChooserPanel
            onDeviceSelected = {this.handleDeviceSelected}
          />

          <DeviceControlPanel 
            selectedDevice = {this.state.selectedDevice}
          />
        </div>

      </div>
    );
  }
}