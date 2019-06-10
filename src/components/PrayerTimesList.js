import React, { Component } from "react";
import Loader from "react-loader-spinner";

import Prayer from "./Prayer";

import "./PrayerTimesList.css";

class PrayerTimesList extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div className="loader">
          <Loader type="Oval" color="rgb(1,205,180)" height="100" width="100" />
        </div>
      );
    }
    const prayers = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
    return (
      <div>
        {this.props.prayerTimes
          .filter(prayer => prayers.includes(prayer[0]))
          .map(prayer => {
            return <Prayer key={prayer[0]} name={prayer[0]} time={prayer[1]} />;
          })}
      </div>
    );
  }
}

export default PrayerTimesList;
