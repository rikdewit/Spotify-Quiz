import { UserContext } from './App'
import React, { useContext, useEffect, useState } from 'react'
import { getPlaylists, getPlaylist, getUser, getTrackInfo, getTrackInfoTop2000 } from './services/spotify'
import { Question } from './Question'
import { AudioPlayer } from './AudioPlayer'
import BuyCoffee from './BuyCoffee'
import Tikkie from './Tikkie'
import FeedbackForm from './FeedbackForm'
import { BadgesUser } from './BadgesUser';

import firestore from './services/firebase';
import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';


export function Quiz(props) {
    const { user, accessToken, refreshToken } = useContext(UserContext);
    const [tracks, setTracks] = useState([]);
    const [questionN, setQuestionN] = useState(0);
    const [track, setTrack] = useState();
    const [end, setEnd] = useState(false);
    const [playing, setPlaying] = useState(false);
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
                s.addEventListener('ended', () => {
                    playedOut();
                })
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

    async function newQuestion(score) {
        if (questionN + 1 < tracks.length) {
            setTrack(tracks[questionN + 1]);
            setQuestionN(questionN + 1);
            play(questionN + 1)

        } else {
            pause(questionN);
            await postHighscore(score);
            setEnd(true);
        }
    }

    async function postHighscore(score) {
        const highScoresRef = firestore.collection('Scores');
        await highScoresRef.add({
            id: user.id,
            name: user.display_name,
            score: score,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    function mute() {
        setMuted(true);
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
        setPlaying(true);
        for (const audio of audios) {
            audio.pause();
        }
        if (n) {
            audios[n].play();
        } else {
            audios[questionN].play();
        }
    }

    function pause(n) {
        setPlaying(false);
        audios[n].pause();
    }

    function replay(n) {
        let audio = audios[n];
        audio.pause();
        audio.currentTime = 0;
        play(n);
    }

    function playedOut() {
        setPlaying(false);
    }

    function start() {
        setStarted(true);
        setQuestionN(0);
        play(0);
    }




    return (
        <div>
            {track ? <Question
                end={end}
                questionN={questionN}
                totalNumber={tracks.length}
                track={track}
                newQuestion={newQuestion}
                start={start}
                mute={mute}
                unMute={unMute}
                muted={muted}
                play={play}
                replay={replay}
                pause={pause}
                playing={playing}
                playedOut={playedOut} />
                :
                <div className="card">
                    loading tracks
                </div>
            }

            <div className="card Bottom flexCenterColumn">

                <h3 className="Username">
                    <span style={{ marginRight: ".5em" }} >
                        <BadgesUser userId={user.id} />
                    </span>

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