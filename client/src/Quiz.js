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


    useEffect(() => {
        getTrackInfoTop2000(accessToken, user.country).then((trackInfo) => {
            setTracks(trackInfo);
            setTrack(trackInfo[questionN]);
        })

    }, [user, accessToken]);

    function newQuestion() {
        if (questionN + 1 < tracks.length) {
            setTrack(tracks[questionN + 1]);
            setQuestionN(questionN + 1);
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

    function start() {
        setStarted(true);
        setQuestionN(0);
    }


    return (
        <div>
            <h4>
                Logged in as {user ? user.display_name : "None"}
            </h4>
            <br></br>

            {track ? <Question end={end} number={questionN} totalNumber={tracks.length} track={track} newQuestion={newQuestion} start={start} mute={mute} unMute={unMute} muted={muted} /> : "No track"}
            <AudioPlayer sources={tracks} playing={questionN} started={started} muted={muted} />
        </div>

    );
}