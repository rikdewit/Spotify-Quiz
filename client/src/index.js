import App from './App.js'
import ReactDOM from 'react-dom'
import $ from 'jquery'


ReactDOM.render(<App />, document.querySelector('.react'));


/**
  * Obtains parameters from the hash of the URL
  * @return Object
  */
function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while (e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

// var userProfileSource = document.getElementById('user-profile-template').innerHTML,
//   userProfileTemplate = Handlebars.compile(userProfileSource),
//   userProfilePlaceholder = document.getElementById('user-profile');

// var oauthSource = document.getElementById('oauth-template').innerHTML,
//   oauthTemplate = Handlebars.compile(oauthSource),
//   oauthPlaceholder = document.getElementById('oauth');

var params = getHashParams();

var access_token = params.access_token,
  refresh_token = params.refresh_token,
  error = params.error;

var userData;

if (error) {
  alert('There was an error during the authentication');
} else {
  if (access_token) {
    // render oauth info
    // oauthPlaceholder.innerHTML = oauthTemplate({
    //     access_token: access_token,
    //     refresh_token: refresh_token
    // });

    $.ajax({
      url: 'https://api.spotify.com/v1/me',
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      success: function (response) {
        userData = response;
        // userProfilePlaceholder.innerHTML = userProfileTemplate(response);
        console.log(response)
        main();
        $('#login').hide();
        $('#loggedin').show();
      }
    });
  } else {
    // render initial screen
    $('#login').show();
    $('#loggedin').hide();
  }
}

function refreshToken() {
  $.ajax({
    url: '/refresh_token',
    data: {
      'refresh_token': refresh_token
    }
  }).done(function (data) {
    access_token = data.access_token;
    // oauthPlaceholder.innerHTML = oauthTemplate({
    //     access_token: access_token,
    //     refresh_token: refresh_token
    // });
  });
}

async function getPlaylists() {
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

async function getPlaylist(id) {

  let playlist = await $.ajax({
    url: `https://api.spotify.com/v1/playlists/${id}?market=${userData.country}`,
    headers: {
      'Authorization': 'Bearer ' + access_token,
    },
  });

  return playlist
}

async function main() {

  let playlists = await getPlaylists();
  let id = playlists[1].id
  let playlist = await getPlaylist(id);
  let tracks = playlist.tracks.items

  let getInfo = (tracks) => {
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

  let container = document.querySelector("#music");
  let info = getInfo(tracks)
  for (var track of info) {
    let title = document.createElement("h3");
    title.innerHTML = track.name;
    container.appendChild(title);

    let a = new Audio(track.preview_url);
    title.addEventListener("mouseover", (event) => {
      a.currentTime = 0;
      a.play();
    });

    title.addEventListener("mouseleave", (event) => {
      a.pause();
    });


  }

}
