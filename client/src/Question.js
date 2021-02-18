import { UserContext } from './App'
import React, { useContext, useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'
import QuestionInput from './QuestionInput'

export function Question(props) {
    const { user, accessToken, refreshToken } = useContext(UserContext);
    const [started, setStarted] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [audio, setAudio] = useState();
    const [progress, setProgress] = useState();
    const [score, setScore] = useState(0);
    const [currentPoints, setCurrentPoints] = useState(0);
    const [guess, setGuess] = useState();
    let timeAllowed = process.env.REACT_APP_TIME_ALLOWED || 10;
    const [inputValue, setInputValue] = useState();


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


    function handleSubmit(event) {
        let points = Math.max(0, 10 - Math.abs(inputValue - parseInt(props.track.release_year)));
        if (progress > 0) {
            if (!guess) {
                setGuess(inputValue);
                setScore(score + points);
                setCurrentPoints(points);
                console.log("you got " + points.toString() + " points!")
            }
        } else {
            if (guess) {
                alert("you guessed " + guess)
            }
            alert("too late!")
        }
        event.preventDefault();
    };

    function handleChange(event) {
        setInputValue(event.target.value)
    }

    function playAgain(event) {
        event.preventDefault();
        window.location.reload();
    }


    return (
        <div className="Question">
            { !props.end ?
                <div>
                    {started ?
                        <div>
                            <h1>Guess the release year of the song</h1>
                            <br />
                            {progress == 0 ?
                                <div>
                                    <h2>{props.track.name}</h2>
                                    <h2>{props.track.artist}</h2>
                                    <h2>{props.track.release_year}</h2>
                                </div>
                                :
                                ""

                            }
                            < br />
                            <h3>Song {props.number + 1}/{props.totalNumber}</h3>
                            <h3>Time: {progress}</h3>
                            <ProgressBar progress={progress / timeAllowed} />
                            <QuestionInput change={handleChange} val={inputValue} submit={handleSubmit} />
                            <button onClick={() => { props.newQuestion(); setCurrentPoints(0); setGuess(null) }}> Next Song</button>
                            <button onClick={props.muted ? props.unMute : props.mute}>{props.muted ? "unmute" : "mute"}</button>
                            {guess ? <h2>You guessed {guess}</h2> : ""}
                            {progress == 0 ? <div><h2>You got {currentPoints} points!</h2> <h2>Your score: {score}</h2></div> : <h2>Your score: {score - currentPoints}</h2>}

                        </div>
                        :
                        <button onClick={() => { props.start(); setStarted(true); }}>Start</button>
                    }
                </div>
                : <div>
                    <h2>Your score: {score}</h2>
                    <button onClick={playAgain}>Play Again</button>
                </div>

            }
        </div>

    );
}