import React from 'react'

const Anchor = (props) => {
        return (
            <a rel="noreferrer noopener" target="_blank" href={props.link} alt={props.name}>
                {props.children}
            </a>
        );
}

export default Anchor;
