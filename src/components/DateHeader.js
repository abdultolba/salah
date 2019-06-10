import React, { Component } from "react";
import { ReactComponent as Mosque } from "../assets/mosque.svg";
import "./DateHeader.css";

class DateHeader extends Component {
  getOrdinalNum = n => {
    return (
      n +
      (n > 0
        ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
        : "")
    );
  };

  renderDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const month = months[new Date().getMonth()];
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    return `${month} ${this.getOrdinalNum(day)}, ${year}`;
  };

  render() {
    return (
      <div>
        <div className="container-header">
          <h3>{this.renderDate()}</h3>
          <h4>{new Date().toLocaleString('en-us', {  weekday: 'long' })}</h4>
        </div>
          <Mosque className="mosque"/>
      </div>
    );
  }
}

export default DateHeader;
