import React, { Component } from "react";
import Prayer from "./Prayer";

class PrayerTimesList extends Component {
  render() {
    const prayers = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
    return (
      <div>
        {console.log(this.props.prayerTimes)}
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
