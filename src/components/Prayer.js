import React, { Component } from 'react';
import './Prayer.css';

class Prayer extends Component {
    displayTime = () => {
        const time = this.props.time;
        /**
         * TODO: Fix weird NaN display on Chrome
         **/
        if(time === '-') return time;
        let splitTime = time.split(':');
        let [ hours, minutes ] = splitTime;
        hours = parseInt(hours);
        const suffix = hours >= 12 ? "PM":"AM";
        if (hours >= 12) hours = hours - 12;
        if (hours === 0) hours = 12;
        return `${hours}:${minutes} ${suffix}`;
    };

    render(){
        return (
            <div className="prayer-bar">
                <h5 className="prayer-name">{this.props.name}</h5>
                <h5 className="prayer">{this.displayTime()}</h5>
            </div>
        )

    }
}

export default Prayer;
