import React from "react";
import LocationSearchInput from "./LocationSearchInput";

import "./LocateManually.css";

class LocateManually extends React.Component {
  renderSearchField() {
    if (this.props.displayForm) {
      return (
        <div>
          <LocationSearchInput handleMapsSearch={this.props.handleMapsSearch} />
        </div>
      );
    }
  }
  render() {
    if (this.props.loading) return <div />;
    return (
      <div className="manual-location">
        <button onClick={this.props.handleClick}>Locate Me Manually</button>
        <br />
        {this.renderSearchField()}
      </div>
    );
  }
}

export default LocateManually;
