import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';

import { MobileOutlined, ThunderboltOutlined } from '@ant-design/icons';
import './sidebar.css';

export default class SideBar extends React.Component {
  state = {
    gotoBasicInfoScreen: false,
    gotoBatteryScreen: false
  };

  handleItemClick = (screen) => {
    if (this.props.fromScreen && this.props.fromScreen === screen) {
      // Already in the selected screen, do nothing.
      return;
    }

    switch (screen) {
      case 'BasicInfoScreen':
        this.setState({gotoBasicInfoScreen: true});
        break;
      case 'BatteryScreen':
        this.setState({gotoBatteryScreen: true});
        break;

      default:
        break;
    }
  }

  componentDidMount = () => {
    if (this.props.fromScreen) {
      switch (this.props.fromScreen) {
        case 'BasicInfoScreen':
        {
          let ele = ReactDOM.findDOMNode(this.refs.BasicInfoScreenRef);
          ele.className = 'side-bar-item-selected';
        }
        break;

        case 'BatteryScreen':
        {
          let ele = ReactDOM.findDOMNode(this.refs.BatteryScreenRef);
          ele.className = 'side-bar-item-selected';
        }
        break;

        default:
        break;
      }
    }
  }

  render() {
    if (this.state.gotoBasicInfoScreen) {
      return (<Redirect to="/debugUI/basicinfoscreen"/>);
    }
    if (this.state.gotoBatteryScreen) {
      return (<Redirect to="/debugUI/batteryscreen"/>);
    }

    return (
      <div>
        <div className="side-bar-item" ref="BasicInfoScreenRef" onClick={(e) => this.handleItemClick("BasicInfoScreen", e)}>
          <MobileOutlined className="side-bar-item-icon" />
          <div className="side-bar-item-text">BasicInfo</div>
        </div>

        <div className="side-bar-item" ref="BatteryScreenRef" onClick={(e) => this.handleItemClick("BatteryScreen", e)}>
          <ThunderboltOutlined className="side-bar-item-icon" />
          <div className="side-bar-item-text">Battery</div>
        </div>

      </div>
    );
  }
}