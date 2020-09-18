import React from 'react';
import ReactDOM from 'react-dom';

import { MobileOutlined } from '@ant-design/icons';
import './sidebar.css';

export default class SideBar extends React.Component {
  state = {
    gotoBasicInfo: false
  };

  componentDidMount = () => {
    if (this.props.fromScreen) {
      switch (this.props.fromScreen) {
        case 'BasicInfoScreen':
        {
          let ele = ReactDOM.findDOMNode(this.refs.basicInfoRef);
          ele.className = 'side-bar-item-selected';
        }
        break;

        default:
        break;
      }
    }
  }

  render() {
    return (
      <div>
        <div className="side-bar-item" ref="basicInfoRef">
          <MobileOutlined className="side-bar-item-icon" />
          <div className="side-bar-item-text">BasicInfo</div>
        </div>

      </div>
    );
  }
}