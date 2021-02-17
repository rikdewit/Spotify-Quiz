import $ from 'jquery'


export async function refreshToken(refresh_token) {

    let access_token = await $.ajax({
        url: '/refresh_token',
        data: {
            'refresh_token': refresh_token
        }
    }).done(function (data) {
        return access_token = data.access_token;
    });
    return access_token
}

export async function getUser(access_token) {
    let userData;
    await $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            userData = response;
        }
    });
    return userData
}


export async function getPlaylists(access_token) {
    let result
    await $.ajax({
        url: 'https://api.spotify.com/v1/me/playlists',
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
        success: function (response) {
            result = response.items
        }
    });

    return result
}

export async function getPlaylist(access_token, id, country) {

    let playlist = await $.ajax({
        url: `https://api.spotify.com/v1/playlists/${id}?market=${country}`,
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
    });

    return playlist
}

export async function getTrackInfo(access_token, country) {
    let playlists = await getPlaylists(access_token);
    let chill = playlists[1]
    let playlist = await getPlaylist(access_token, chill.id, country);
    let tracks = playlist.tracks.items
    let info = getInfo(tracks);
    console.log(info)
    return info
}

function getInfo(tracks) {
    let info = []
    // console.log(tracks.tracks.items)
    for (var track of tracks.splice(0, 10)) {
        console.log(track)
        let release_date = track.track.album.release_date;
        let preview_url = track.track.preview_url
        let name = track.track.name;
        info.push({ "release_date": release_date, "preview_url": preview_url, "name": name });
    }
    return info
}

// async function main() {

    // let playlists = await getPlaylists();
    // let id = playlists[1].id
    // let playlist = await getPlaylist(id);
    // let tracks = playlist.tracks.items

    // let getInfo = (tracks) => {
    //     let info = []
    //     // console.log(tracks.tracks.items)
    //     for (var track of tracks.splice(0, 10)) {
    //         console.log(track)
    //         let release_date = track.track.album.release_date;
    //         let preview_url = track.track.preview_url
    //         let name = track.track.name;
    //         info.push({ "release_date": release_date, "preview_url": preview_url, "name": name });
    //     }
    //     return info
    // }

//     let container = document.querySelector("#music");
//     let info = getInfo(tracks)
//     for (var track of info) {
//         let title = document.createElement("h3");
//         title.innerHTML = track.name;
//         container.appendChild(title);

//         let a = new Audio(track.preview_url);
//         title.addEventListener("mouseover", (event) => {
//             a.currentTime = 0;
//             a.play();
//         });

//         title.addEventListener("mouseleave", (event) => {
//             a.pause();
//         });


//     }

// }
