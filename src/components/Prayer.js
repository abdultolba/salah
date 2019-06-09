import React from 'react';
import './Prayer.css';

const Prayer = (props) => {
    return (
        <div className="prayer-bar">
            <h5 className="prayer-name">{props.name}</h5>
            <h5 className="prayer">{props.time}</h5>
        </div>
    )
}

export default Prayer;
