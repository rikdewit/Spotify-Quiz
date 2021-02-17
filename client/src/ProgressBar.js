import React, { useState } from 'react'

export default function ProgressBar(props) {
    let width = (props.progress * 100).toString() + "%";
    const barStyle = {
        width: width
    }
    return (
        <div>
            <div className="ProgressBar">
                <div className="Bar" style={barStyle}></div>
            </div>
        </div>


    );
}


