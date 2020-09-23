import React from 'react';
import $ from 'jquery';
import { Button } from 'antd';
import { ReloadOutlined, LoadingOutlined, PoweroffOutlined, UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';

const KEY_POWER = "26";
const KEY_VOLUP = "24";
const KEY_VOLDOWN = "25";

export default class DeviceControlPanel extends React.Component {
  state = {
    imageSrc: null,
    loading: false, // for loading animation.
  };
  continuousDisplay = false;

  handleReloadButtonClick = () => {
    this.getScreen();
  }

  handleKeyClick = (key) => {
    console.log(`${key} pressed.`);

    let data = {device: null, key: key};
    if (this.props.selectedDevice) {
      data.device = this.props.selectedDevice;
    }

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/cmd/adb/shell/input",
      data: data,
      success: (res) => {
        if (res.ok === 'ok') {

        }
      },
      error: () => {
        console.error("inputkey SERVER ERROR!");
      }
    });
  }

  getScreen = () => {
    this.setState({
      loading: true
    });

    let data = {device: null};
    if (this.props.selectedDevice) {
      data.device = this.props.selectedDevice;
    }

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/cmd/adb/shell/screencap",
      data: data,
      success: (res) => {
        if (res.ok === 'ok') {
          this.setState({
            imageSrc: res.info,
            loading: false
          });
        }
        if (this.continuousDisplay) {
          setTimeout(() => {
            this.getScreen();
          }, 1000);
          
        }
      },
      error: () => {
        console.error("screencap SERVER ERROR!");
      }
    });
  }

  componentDidMount = () => {
    this.getScreen();
  }

  render() {
    let reloadIcon;
    if (this.state.loading) {
      reloadIcon = <LoadingOutlined />;
    } else {
      reloadIcon = <ReloadOutlined />;
    }

    return(
      <div className="device-control-panel">

        <div className="device-control-keybar">
          <Button type="text" shape="circle" className="key-button"
                  icon={reloadIcon} 
                  onClick={this.handleReloadButtonClick}/>
          <Button type="text" shape="circle" className="key-button"
                icon={<UpCircleOutlined />} 
                onClick={(e) => this.handleKeyClick(KEY_VOLUP, e)}/>
          <Button type="text" shape="circle" className="key-button"
                icon={<DownCircleOutlined />} 
                onClick={(e) => this.handleKeyClick(KEY_VOLDOWN, e)}/>
          <Button type="text" shape="circle" className="key-button"
                icon={<PoweroffOutlined />} 
                onClick={(e) => this.handleKeyClick(KEY_POWER, e)}/>
        </div>

        <div className="device-control-image">
          <img ref="imgElement" src={this.state.imageSrc} alt='' width='360' height='720' />
        </div>
        
      </div>
    );
  }
}