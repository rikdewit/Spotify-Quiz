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

export async function getPlaylist(access_token, id, country, offset = 0, limit = 20) {
    let url = `https://api.spotify.com/v1/playlists/${id}/tracks?market=${country}&limit=${limit}&offset=${offset}`
    let playlist = await $.ajax({
        url: url,
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
    let tracks = playlist.items
    let info = getInfo(tracks);
    return info
}

export async function getTrackInfoTop2000(access_token, country,) {
    let randInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let offset = randInt(0, 1997 - 10);
    let playlist = await getPlaylist(access_token, "1g73uXpPOOjlDS96OSTSO4", country, offset = offset);
    let tracks = playlist.items
    let info = getInfo(tracks);
    return info
}

function getInfo(tracks) {
    let info = []
    for (var track of tracks) {
        let type = track.track.album.album_type
        if (type == "album" || type == "single") {
            let release_date = track.track.album.release_date;
            let preview_url = track.track.preview_url
            let name = track.track.name;
            let artist = track.track.artists[0].name;
            let release_year = release_date.split("-")[0]
            let image = track.track.album.images[1].url
            console.log(track);

            info.push({ "release_year": release_year, "release_date": release_date, "preview_url": preview_url, "name": name, "artist": artist, "image": image });
        }
        if (info.length == 10) {
            return info;
        }
    }
    return info
}

