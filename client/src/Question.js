import { UserContext } from './App'
import React, { useContext, useEffect, useState } from 'react'

export function Question(props) {
    return (
        <div className="Question">
            <h2>{props.track.name}</h2>
            <h3>{props.number}</h3>
            <button onClick={props.newQuestion}> Next Question</button>
        </div>

    );
}