import { UserContext } from './App'
import React, { useContext, useEffect, useState } from 'react'

export function Question(props) {
    const [started, setStarted] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [audio, setAudio] = useState();
    useEffect(() => {
        if (audio) {
            pause();
            loadAudio(true);
        }
    }, [props.number])

    function loadAudio(play) {
        setPlaying(false);

        let a = new Audio(props.track.preview_url);
        setAudio(a);
        a.currentTime = 0;
        if (play) {
            a.play();
            setPlaying(true);
        }


    }

    function pause() {
        setPlaying(false);
        audio.pause();
    }

    function play() {
        setPlaying(true);
        audio.play();
    }



    return (
        <div className="Question">


            {started ?
                <div>
                    <h2>{props.track.name}</h2>
                    <h3>{props.number}</h3>
                    <button onClick={props.newQuestion}> Next Question</button>
                </div>
                :
                <button onClick={() => { setStarted(true); loadAudio(true) }}>Start</button>
            }

        </div>

    );
}