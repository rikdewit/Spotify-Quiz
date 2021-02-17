import { UserContext } from './App'
import React, { useContext, useEffect, useState } from 'react'
import { getPlaylists, getPlaylist, getUser, getTrackInfo } from './services/spotify'



export function Music(props) {
    const { user, accessToken, refreshToken } = useContext(UserContext);
    const [playlist, setPlaylist] = useState();
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        getTrackInfo(accessToken, user.country).then((trackInfo) => {
            setTracks(trackInfo);
            console.log(tracks)
        })

    }, []);

    return (
        <div>
            <h1>
                Logged in as {user ? user.display_name : "None"}
            </h1>
            <h2>
                {accessToken}
            </h2>
            <ul>
                {tracks.map((item, index) => (
                    <li key={index}> {item.name} </li>
                ))}
            </ul>
        </div>

    );
}