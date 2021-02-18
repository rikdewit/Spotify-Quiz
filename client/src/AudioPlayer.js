import React, { useState, useEffect } from 'react'

export function AudioPlayer(props) {
    const [audios, setAudios] = useState([]);
    const [playing, setPlaying] = useState();
    useEffect(() => {
        let as = [];
        for (let track of props.sources) {
            let a = new Audio(track.preview_url);
            a.currentTime = 0;
            if (props.muted) {
                a.volume = 0;
            } else {
                a.volume = 0.2;
            }
            as.push(a)
        }
        setAudios(as);
    }, [props.sources])

    useEffect(() => {
        if (audios.length) {
            for (let audio of audios) {
                audio.pause();
            }
            audios[props.playing].play();
            setPlaying(props.playing);
        }

    }, [props.playing, props.started])

    useEffect(() => {
        if (audios.length) {
            for (let audio of audios) {
                if (props.muted) {
                    audio.volume = 0;

                } else {
                    audio.volume = 0.2;
                }
            }
        }

    }, [props.muted])


    return null
}