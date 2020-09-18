import React from 'react';
import $ from 'jquery';

export default class DeviceChooserPanel extends React.Component {
  state = {
    devices: []
  };

  getDevices = () => {
    $.ajax({
      type: "POST",
      url: "/cmd/adb/devices",
      success: (res) => {
        console.log(`get devices: ${res}`);
        // /cmd/adb/devices will return a string which is converted from array:
        // arr.toString()
        let arr = [];
        if(res != "") {
          arr = res.split(",");
        }
        this.setState({
          devices: arr,
        });
      },
      error: () => {
        console.log('failed to run cmd adb devices.');
      }
    });
  }

  componentDidMount = () => {
    this.getDevices();
  }

  render() {
    return (
      <div>
        {this.state.devices.length == 0 ? "<No Device>":this.state.devices}
      </div>
    );
  }
}