import { UserContext } from './App'
import React, { useContext, useEffect, useState } from 'react'
import { getPlaylists, getPlaylist, getUser, getTrackInfo, getTrackInfoTop2000 } from './services/spotify'
import { Question } from './Question'
import { AudioPlayer } from './AudioPlayer'
import BuyCoffee from './BuyCoffee'
import Tikkie from './Tikkie'
import FeedbackForm from './FeedbackForm'
import firestore from './services/firebase';
import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';


export function Quiz(props) {
    const { user, accessToken, refreshToken } = useContext(UserContext);
    const [tracks, setTracks] = useState([]);
    const [questionN, setQuestionN] = useState(0);
    const [track, setTrack] = useState();
    const [end, setEnd] = useState(false);
    const [started, setStarted] = useState(false);
    let muteState = false;
    if ('REACT_APP_MUTED' in process.env) {
        muteState = process.env.REACT_APP_MUTED == 'true';
    }
    const [muted, setMuted] = useState(muteState);

    const [audios, setAudios] = useState([]);

    useEffect(() => {
        getTrackInfoTop2000(accessToken, user.country).then((trackInfo) => {
            setTracks(trackInfo);
            setTrack(trackInfo[questionN]);

            let sounds = [];
            for (const t of trackInfo) {
                let s = new Audio(t.preview_url);
                if (muted) {
                    s.volume = 0;
                } else {
                    s.volume = 0.2;
                }
                sounds.push(s);
            }

            setAudios(sounds);
        })

    }, [user, accessToken]);

    function newQuestion(score) {
        if (questionN + 1 < tracks.length) {
            setTrack(tracks[questionN + 1]);
            setQuestionN(questionN + 1);
            play(questionN + 1)

        } else {
            postHighscore(score);
            setEnd(true);
        }
    }

    async function postHighscore(score) {
        const highScoresRef = firestore.collection('Highscores');
        await highScoresRef.add({
            id: user.id,
            name: user.display_name,
            score: score,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    function mute() {
        setMuted(true);
        console.log("mute")
        for (const audio of audios) {
            audio.volume = 0;
        }
    }

    function unMute() {
        setMuted(false);
        for (const audio of audios) {
            audio.volume = 0.2
        }
    }

    function play(n) {
        for (const audio of audios) {
            audio.pause();
        }
        if (n) {
            audios[n].play();
        } else {
            audios[questionN].play();
        }

    }

    function start() {
        setStarted(true);
        setQuestionN(0);
        play(0);
    }




    return (
        <div>
            {track ? <Question end={end} number={questionN} totalNumber={tracks.length} track={track} newQuestion={newQuestion} start={start} mute={mute} unMute={unMute} muted={muted} /> : "No track"}
            <div className="card Bottom flexCenterColumn">

                <h3 className="Username">
                    {user ? user.display_name : "Login error"}
                </h3>
                <FeedbackForm />
                <br />
                <BuyCoffee />
                <Tikkie />
                <br />
            </div>
        </div>

    );
}