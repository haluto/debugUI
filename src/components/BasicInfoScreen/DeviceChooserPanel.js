import React from 'react';
import { Select, Button } from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
import $ from 'jquery';

export default class DeviceChooserPanel extends React.Component {
  state = {
    devices: [],
    selectedDevice: ''
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

  handleDeviceSelectChange = (value) => {
    if (value == "empty") {
      alert("Error, no device connected but selected the empty, should not happen.");
      return;
    }

    this.setState({
      selectedDevice: value
    });
  }

  handleReloadButtonClick = () => {
    this.getDevices();
  }

  componentDidMount = () => {
    this.getDevices();
  }

  render() {
    let items = [];
    if (this.state.devices.length == 0) {
      items.push(
        <Select.Option value="empty" disabled style={{ width: 180 }}>No device</Select.Option>
      );
    } else {
      this.state.devices.map((device, i) => {
        items.push(
        <Select.Option value={device} style={{ width: 180 }}>{device}</Select.Option>
        );
      });
    }

    return (
      <div className="divice-choose-panel">
        <Button type="text" shape="circle" className="reload-button"
                icon={<ReloadOutlined />} 
                onClick={this.handleReloadButtonClick}/>

        <Select defaultValue="Choose a device:" onChange={this.handleDeviceSelectChange} style={{ width: 180 }}>
          {items}
        </Select>
        
        <div className="connected-device-info">
          已连接设备：{this.state.selectedDevice}
        </div>
      </div>
    );
  }
}