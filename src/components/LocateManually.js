import React, { Component } from "react";
import LocationSearchInput from "./LocationSearchInput";
import "./LocateManually.css";

class LocateManually extends Component {
  renderSearchField() {
    if (this.props.displayForm) {
      return (
        <div>
          <LocationSearchInput unMountMe={this.props.unMountInputField} handleMapsSearch={this.props.handleMapsSearch} />
        </div>
      );
    }
  }
  render() {
    if (this.props.loading) return null;
    return (
      <div className="manual-location">
        <button onClick={this.props.handleClick}>Locate Me Manually</button>
        {this.renderSearchField()}
      </div>
    );
  }
}

export default LocateManually;
