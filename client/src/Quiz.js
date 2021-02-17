import { UserContext } from './App'
import React, { useContext, useEffect, useState } from 'react'
import { getPlaylists, getPlaylist, getUser, getTrackInfo } from './services/spotify'
import { Question } from './Question'


export function Quiz(props) {
    const { user, accessToken, refreshToken } = useContext(UserContext);
    const [tracks, setTracks] = useState([]);
    const [questionN, setQuestionN] = useState(0);
    const [track, setTrack] = useState();

    useEffect(() => {
        getTrackInfo(accessToken, user.country).then((trackInfo) => {
            setTracks(trackInfo);
            setTrack(trackInfo[questionN]);
        })

    }, [user, accessToken]);

    function newQuestion() {
        setTrack(tracks[questionN + 1]);
        setQuestionN(questionN + 1);

    }
    return (
        <div>
            <h4>
                Logged in as {user ? user.display_name : "None"}
            </h4>
            <br></br>

            {track ? <Question number={questionN} totalNumber={tracks.length} track={track} newQuestion={newQuestion} /> : "No track"}

        </div>

    );
}