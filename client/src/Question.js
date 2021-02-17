import { UserContext } from './App'
import React, { useContext, useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'
import QuestionInput from './QuestionInput'

export function Question(props) {
    const [started, setStarted] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [muted, setMute] = useState(true);
    const [audio, setAudio] = useState();
    const [progress, setProgress] = useState();
    const [score, setScore] = useState(0);
    let timeAllowed = 40;
    const [inputValue, setInputValue] = useState();


    useEffect(() => {
        if (audio) {
            pause();
            loadAudio(true);
        }
    }, [props.number])


    useEffect(() => {
        let interval;
        let timer = timeAllowed;
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
        if (muted) {
            a.volume = 0;
        } else {
            a.volume = 0.2;
        }

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

    function handleSubmit(event) {
        let points = Math.max(0, 10 - Math.abs(inputValue - parseInt(props.track.release_year)));
        if (progress > 0) {
            setScore(score + points);
            console.log("you got " + points.toString() + " points!")
        } else {
            console.log("too late!")
        }
        event.preventDefault();
    };

    function handleChange(event) {
        setInputValue(event.target.value)
    }


    return (
        <div className="Question">
            {started ?
                <div>
                    <h2>{props.track.name}</h2>
                    <h2>{props.track.artist}</h2>
                    <h2>{props.track.release_year}</h2>
                    <h3>{props.number}</h3>
                    <h3>Time: {progress}</h3>
                    <ProgressBar progress={progress / timeAllowed} />
                    <QuestionInput change={handleChange} val={inputValue} submit={handleSubmit} />
                    <button onClick={props.newQuestion}> Next Question</button>
                    <button onClick={muted ? () => unMute() : () => mute()}>{muted ? "unmute" : "mute"}</button>
                    <h2>{score}</h2>
                </div>
                :
                <button onClick={() => { setStarted(true); loadAudio(true); }}>Start</button>
            }
        </div>

    );
}