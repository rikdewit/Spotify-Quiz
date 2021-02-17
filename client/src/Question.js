import { UserContext } from './App'
import React, { useContext, useEffect, useState } from 'react'

export function Question(props) {
    const [started, setStarted] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [muted, setMute] = useState(true);
    const [audio, setAudio] = useState();
    const [progress, setProgress] = useState();

    useEffect(() => {
        if (audio) {
            pause();
            loadAudio(true);
        }
    }, [props.number])


    useEffect(() => {
        let interval;
        let timer = 40;
        setProgress(timer);

        interval = setInterval(() => {
            if (timer > 0 && started) {
                timer--;
                setProgress(timer);
            }
        }, 1000);

        return () => { clearInterval(interval); };

    }, [props.number, started]);




    function loadAudio(play) {
        setPlaying(false);

        let a = new Audio(props.track.preview_url);
        a.currentTime = 0;
        a.volume = 0;
        if (play) {
            a.play();
            setPlaying(true);
        }
        setAudio(a);
    }

    function pause() {
        setPlaying(false);
        audio.pause();
    }

    function mute() {
        setMute(true);
        audio.volume = 0;
    }

    function unMute() {
        setMute(false);
        audio.volume = 0.2
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
                    <h3>Time: {progress}</h3>

                    <button onClick={props.newQuestion}> Next Question</button>
                    <button onClick={muted ? () => unMute() : () => mute()}>{muted ? "unmute" : "mute"}</button>
                </div>
                :
                <button onClick={() => { setStarted(true); loadAudio(true); }}>Start</button>
            }

        </div>

    );
}