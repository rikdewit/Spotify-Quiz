import { UserContext } from './App'
import React, { useContext, useEffect, useState } from 'react'
import QuestionInput from './QuestionInput'
import { LinearProgress } from '@material-ui/core'
import { DateTime } from 'luxon'
import BuyCoffee from './BuyCoffee'
import Highscores from './Highscores'


export function Question(props) {
    const { user, accessToken, refreshToken } = useContext(UserContext);
    const [started, setStarted] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [audio, setAudio] = useState();
    const [score, setScore] = useState(0);
    const [currentPoints, setCurrentPoints] = useState(0);
    const [guess, setGuess] = useState();
    const [lockedIn, setLockedIn] = useState(false);
    let timeAllowed = process.env.REACT_APP_TIME_ALLOWED || 10;
    const [progress, setProgress] = useState(timeAllowed);
    const [timer, setTimer] = useState(timeAllowed);
    const [paused, setPaused] = useState(false);
    const [inputValue, setInputValue] = useState(DateTime.now());


    useEffect(() => {
        if (started) {
            startTimer();
        }
    }, [props.number, started]);

    function startTimer() {
        setPaused(false);
        setTimer(timeAllowed);
        setTimeout(() => {
            setTimer(timeAllowed - 1);
        }, 1000)
    }

    useEffect(() => {
        if (started && !paused) {
            setProgress(timer);
            if (timer > 0) {
                setTimeout(() => {
                    setTimer(timer - 1)
                }, 1000)
            }
        }
        if (paused) {
            setTimer(timeAllowed);
        }

    }, [timer])



    useEffect(() => {
        if (progress == 0) {
            lockIn();
        }
    }, [progress])

    function lockIn() {
        if (!lockedIn) {
            setGuess(inputValue);
            setScore(score + currentPoints);
            setLockedIn(true);
            setPaused(true);
            console.log("locked in")
        }

    }
    function handleSubmit(change) {
        let value = change.year;
        setInputValue(change)
        console.log(change)
        let points = Math.max(0, 10 - Math.abs(value - parseInt(props.track.release_year)));
        if (progress > 0) {
            setGuess(value);
            setCurrentPoints(points);
            console.log("you got " + points.toString() + " points!")

        } else {
            alert("too late!");
        }
    };


    function playAgain(event) {
        event.preventDefault();
        window.location.reload();
    }


    function share() {
        let text = `I got ${score} points on SpotifyQuiz! Can you beat me?`;
        if (navigator.canShare) {
            navigator.share({
                title: 'SpotifyQuiz',
                text: text,
                url: 'https://spotifyquiz.rikdewit.nl',
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            // var promise = navigator.clipboard.writeText(text).then(alert("copied text to clipboard!")).catch((err) => console.log(err))
        }
    }


    return (
        <div className="Question">
            { !props.end ?
                <div>
                    {started ?
                        <div>
                            <div className="card">

                                <br />
                                <br />
                                {progress == 0 ?
                                    <div className="TrackInfo">
                                        <img className="Cover" src={props.track.image} width="300" height="300"></img>
                                        <h2 className="Title">{props.track.name}</h2>
                                        <h2 className="Artist">{props.track.artist}</h2>
                                        <h2 className="Year">{props.track.release_year}</h2>
                                    </div>
                                    :
                                    <div className="TrackInfo">
                                        <div className="Cover Placeholder"></div>
                                        <h2>?</h2>
                                    </div>
                                }
                                <br />
                                {progress == 0 ?
                                    <div className="scoreContainer">

                                        <h2>Score: {score}
                                            <div className="Points">+{currentPoints} </div>
                                        </h2>
                                    </div>

                                    :
                                    <div className="scoreContainer">
                                        <h2>Score: {score}</h2>
                                    </div>
                                }
                                < br />
                                <h3 className="SongNumber">Song {props.number + 1}/{props.totalNumber}</h3>
                                <LinearProgress
                                    color="primary"
                                    variant="determinate"
                                    value={100 * progress / timeAllowed}
                                />

                                <QuestionInput val={inputValue} submit={handleSubmit} />


                                {lockedIn ?
                                    <button className="Spotify" onClick={() => {
                                        props.newQuestion(score);
                                        setCurrentPoints(0);
                                        setProgress(timeAllowed);
                                        setGuess(inputValue);
                                        setLockedIn(false);
                                    }}>next</button>
                                    :
                                    <button className="Spotify" onClick={() => {
                                        lockIn();
                                        setProgress(0);
                                    }}>lock in</button>
                                }


                                {/* <button
                                    className="Spotify"
                                    onClick={
                                        props.muted ? props.unMute : props.mute}>

                                    {props.muted ? "unmute" : "mute"}
                                </button> */}
                            </div>
                        </div>
                        :
                        <div className="card flexCenterColumn">
                            <h1>Guess the release year of the song</h1>
                            <button className="Spotify start" onClick={() => { props.start(); setStarted(true); }}>Start</button>
                        </div>
                    }
                </div>
                : <div className="card flexCenterColumn">
                    <h2>Your score</h2>
                    <h1>{score}</h1>
                    {navigator.canShare ? <button className="Spotify" onClick={share}>Share</button> : null}
                    <button className="Spotify" onClick={playAgain}>Play Again</button>
                    <br></br>
                    <br></br>


                    <Highscores />
                </div>

            }
        </div>

    );
}