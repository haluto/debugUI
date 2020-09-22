import React from 'react';
import $ from 'jquery';

export default class DeviceControlPanel extends React.Component {
  state = {
    imageSrc: null
  };
  continuousDisplay = false;

  getScreen = () => {
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/cmd/adb/shell/screencap",
      //data: {device: "xx"},
      success: (res) => {
        if (res.ok === 'ok') {
          this.setState({
            imageSrc: res.info
          });
        }
        if (this.continuousDisplay) {
          this.getScreen();
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
    return(
      <div>
        <img ref="imgElement" src={this.state.imageSrc} alt='' width='480' height='640' />
      </div>
    );
  }
}