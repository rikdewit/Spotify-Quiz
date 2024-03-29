import { UserContext } from './App'
import React, { useContext, useEffect, useState } from 'react'
import QuestionInput from './QuestionInput'
import { LinearProgress } from '@material-ui/core'
import { DateTime } from 'luxon'
import ReplayButton from './ReplayButton'
import Highscores from './Highscores'
import { YearIncorrectLink } from './YearIncorrectLink'

export function Question(props) {
    const { user, accessToken, refreshToken } = useContext(UserContext);
    const [started, setStarted] = useState(false);
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
    }, [props.questionN, started]);

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
        }

    }
    function handleSubmit(change) {
        let value = change.year;
        setInputValue(change)
        let points = Math.max(0, 10 - Math.abs(value - parseInt(props.track.release_year)));
        if (progress > 0) {
            setGuess(value);
            setCurrentPoints(points);
        } else {
            alert("too late!");
        }
    };


    function playAgain(event) {
        event.preventDefault();
        window.location.reload();
    }


    function share() {
        let text = `Ik heb ${score} punten gescoord op top200Quiz! Kan je mij verslaan?`;
        if (navigator.canShare) {
            navigator.share({
                title: 'SpotifyQuiz',
                text: text,
                url: window.location.origin,
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            // var promise = navigator.clipboard.writeText(text).then(alert("copied text to clipboard!")).catch((err) => console.log(err))
        }
    }

    return (
        <div className="Question">
            {!props.end ?
                <div>
                    {started ?
                        <div>
                            <div className="card">

                                <br />
                                <br />
                                {progress == 0 ?
                                    <div>
                                        <div className="TrackInfo">
                                            <img className="Cover" src={props.track.image} width="300" height="300" alt="album cover"></img>
                                            <h2 className="Title">{props.track.name}</h2>
                                            <h2 className="Artist">{props.track.artist}</h2>
                                            <h2 className="Year">{props.track.release_year}</h2>
                                            <ReplayButton play={props.play} pause={props.pause} replay={props.replay} questionN={props.questionN} progress={progress} playing={props.playing} />
                                            <YearIncorrectLink track={props.track}></YearIncorrectLink>
                                        </div>
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
                                <h3 className="SongNumber">Nummer {props.questionN + 1}/{props.totalNumber}</h3>
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
                                    }}>{props.questionN < 9 ? "volgende" : "uitslag"}</button>
                                    :
                                    <button className="Spotify" onClick={() => {
                                        lockIn();
                                        setProgress(0);
                                    }}>Raden</button>
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
                            <h1>Raad wanneer de nummers zijn uitgebracht</h1>
                            <button className="Spotify start" onClick={() => { props.start(); setStarted(true); }}>Start</button>
                            <br />
                            <br />
                            <Highscores />
                        </div>
                    }
                </div>
                : <div className="card flexCenterColumn">
                    <h2>Jouw score</h2>
                    <h1>{score}</h1>
                    {navigator.canShare ? <button className="Spotify SecondaryButton" onClick={share}>Delen</button> : null}
                    <button className="Spotify" onClick={playAgain}>Opnieuw spelen</button>
                    <br></br>
                    <br></br>


                    <Highscores />
                </div>

            }
        </div>

    );
}