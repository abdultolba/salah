import React, { Component } from 'react';
import Prayer from './Prayer';

class PrayerTimesList extends Component {
    render() {
        return (
            <div>
                {this.props.prayerTimes.map(prayer => <Prayer/>)}
            </div>
        )
    }
}

export default PrayerTimesList;
