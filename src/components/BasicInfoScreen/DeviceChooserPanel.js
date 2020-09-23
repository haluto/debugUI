import React from 'react';
import { Select, Button } from 'antd';
import { ReloadOutlined, LoadingOutlined } from '@ant-design/icons';
import $ from 'jquery';

export default class DeviceChooserPanel extends React.Component {
  state = {
    devices: [],
    selectedDevice: '',
    loading: false, // for loading animation.
  };

  getDevices = () => {
    this.setState({
      loading: true
    });

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
          loading: false
        });
      },
      error: () => {
        console.error('failed to run cmd adb devices.');
        this.setState({
          loading: false
        });
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

    // tell parent that user has chosen a device.
    if (this.props.onDeviceSelected) {
      this.props.onDeviceSelected(value);
    }

    // tell other screens the selected device.
    let json = {device: value};
    localStorage.setItem("debugUI_selected_device", JSON.stringify(json));
  }

  handleReloadButtonClick = () => {
    this.getDevices();
  }

  componentDidMount = () => {
    this.getDevices();

    // Each time reload the page, remove the selectedDevice in localstorage.
    let json = {device: null};
    localStorage.setItem("debugUI_selected_device", JSON.stringify(json));
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

    let reloadIcon;
    if (this.state.loading) {
      reloadIcon = <LoadingOutlined />;
    } else {
      reloadIcon = <ReloadOutlined />;
    }

    return (
      <div className="device-choose-panel">
        <Button type="text" shape="circle" className="reload-button"
                icon={reloadIcon} 
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