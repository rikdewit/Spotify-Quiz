import { UserContext } from './App'
import React, { useContext, useEffect, useState } from 'react'
import { getPlaylists, getPlaylist, getUser, getTrackInfo, getTrackInfoTop2000 } from './services/spotify'
import { Question } from './Question'
import { AudioPlayer } from './AudioPlayer'


export function Quiz(props) {
    const { user, accessToken, refreshToken } = useContext(UserContext);
    const [tracks, setTracks] = useState([]);
    const [questionN, setQuestionN] = useState(0);
    const [track, setTrack] = useState();
    const [end, setEnd] = useState(false);
    const [started, setStarted] = useState(false);
    const [muted, setMuted] = useState(true);
    const [audios, setAudios] = useState([]);

    useEffect(() => {
        getTrackInfoTop2000(accessToken, user.country).then((trackInfo) => {
            setTracks(trackInfo);
            setTrack(trackInfo[questionN]);

            let sounds = [];
            for (const t of trackInfo) {
                let s = new Audio(t.preview_url);
                s.volume = 0.2;
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
    }

    function unMute() {
        setMuted(false);
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
        play();
    }




    return (
        <div>
            <h4>
                Logged in as {user ? user.display_name : "None"}
            </h4>
            <br></br>

            {track ? <Question end={end} number={questionN} totalNumber={tracks.length} track={track} newQuestion={newQuestion} start={start} mute={mute} unMute={unMute} muted={muted} /> : "No track"}
            {/* <AudioPlayer sources={tracks} playing={questionN} started={started} muted={muted} /> */}
        </div>

    );
}