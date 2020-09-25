import React from 'react';
import $ from 'jquery';
import { Switch } from 'antd';

export default class BatteryInfoPanel extends React.Component {
  state = {
    isCharging: false,
    isBatterySaver: false,
  };

  getChargingStatus = () => {
    let data = {device: null, op: 'get'};
    //TODO: should get deivce info from LocalStorage.

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/cmd/battery/charging",
      data: data,
      success: (res) => {
        if (res.ok === 'ok') {
          console.log(`get charging status: ${res.value}`);
          let stat = (res.value==1?true:false);
          this.setState({isCharging: stat});
        } else {
          console.log("get charging status: failed");
        }
      },
      error: () => {
        console.error("get charging status SERVER ERROR!");
      }
    });
  }

  setChargingStatus = (status) => {
    let value = (status==true?1:0);
    let data = {device: null, op: 'set', value: value};
    //TODO: should get deivce info from LocalStorage.

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/cmd/battery/charging",
      data: data,
      success: (res) => {
        if (res.ok === 'ok') {
          console.log(`set charging status: ${res.value}`);
          let stat = (res.value==1?true:false);
          this.setState({isCharging: stat});
        } else {
          console.log("set charging status: failed");
        }
      },
      error: () => {
        console.error("set charging status SERVER ERROR!");
      }
    });
  }

  getBatterySaverStatus = () => {
    let data = {device: null, op: 'get'};
    //TODO: should get deivce info from LocalStorage.

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/cmd/battery/batterysaver",
      data: data,
      success: (res) => {
        if (res.ok === 'ok') {
          console.log(`get battery saver status: ${res.value}`);
          let stat = (res.value==1?true:false);
          this.setState({isBatterySaver: stat});
        } else {
          console.log("get battery saver status: failed");
        }
      },
      error: () => {
        console.error("get battery saver status SERVER ERROR!");
      }
    });
  }

  setBatterySaverStatus = (status) => {
    let value = (status==true?1:0);
    let data = {device: null, op: 'set', value: value};
    //TODO: should get deivce info from LocalStorage.

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/cmd/battery/batterysaver",
      data: data,
      success: (res) => {
        if (res.ok === 'ok') {
          console.log(`set battery saver status: ${res.value}`);
          let stat = (res.value==1?true:false);
          this.setState({isBatterySaver: stat});
        } else {
          console.log("set battery saver status: failed");
        }
      },
      error: () => {
        console.error("set battery saver status SERVER ERROR!");
      }
    });
  }


  onChargingSwitchChanged = (checked) => {
    this.setChargingStatus(checked);
  }

  onBatterySaverSwitchChanged = (checked) => {
    this.setBatterySaverStatus(checked);
  }

  componentDidMount = () => {
    this.getChargingStatus();
    this.getBatterySaverStatus();
  }

  render() {
    return (
      <div className="battery-info-panel">
        <div className="battery-info-panel-item">
          <div className="battery-info-panel-item-title">Charging</div>
          <div className="battery-info-panel-item-icon">
            <Switch  
              checked={this.state.isCharging} 
              onChange={this.onChargingSwitchChanged} />
          </div>
        </div>

        <div className="battery-info-panel-item">
          <div className="battery-info-panel-item-title">Battery Saver</div>
          <div className="battery-info-panel-item-icon">
            <Switch disabled={this.state.isCharging}
              checked={this.state.isBatterySaver} 
              onChange={this.onBatterySaverSwitchChanged} />
          </div>
        </div>
      </div>
    );
  }
}