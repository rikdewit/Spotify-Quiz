import { UserContext } from './App'
import React, { useContext, useEffect, useState } from 'react'
import { getPlaylists, getPlaylist, getUser, getTrackInfo, getTrackInfoTop2000 } from './services/spotify'
import { Question } from './Question'
import { AudioPlayer } from './AudioPlayer'
import BuyCoffee from './BuyCoffee'


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

    function newQuestion() {
        if (questionN + 1 < tracks.length) {
            setTrack(tracks[questionN + 1]);
            setQuestionN(questionN + 1);
            play(questionN + 1)

        } else {
            setEnd(true);
        }
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
            <div className="card flexCenterRow TopBar">
                <img className="SpotifyLogo" src="/img/Spotify_Icon_RGB_Green.png"></img>
                <h1 className="TopTitle" >SpotifyQuiz</h1>

            </div>

            {track ? <Question end={end} number={questionN} totalNumber={tracks.length} track={track} newQuestion={newQuestion} start={start} mute={mute} unMute={unMute} muted={muted} /> : "No track"}
            <div className="card Bottom flexCenterColumn">

                <h3 className="Username">
                    {user ? user.display_name : "Login error"}
                </h3>
                <BuyCoffee />

            </div>
        </div>

    );
}