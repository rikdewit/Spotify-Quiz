import React, { useState, useEffect } from 'react';
import getHashParams from './services/utils'
import { getPlayLists, getPlayList, getUser } from './services/spotify'
import { LoginButton } from './LoginButton'
import { Quiz } from './Quiz'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import "firebase/auth";

export const UserContext = React.createContext({ user: {}, accessToken: {}, refreshToken: {} });

function App() {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [firebaseToken, setFirebaseToken] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    let params = getHashParams();
    setAccessToken(params.access_token)
    setRefreshToken(params.refresh_token)
    setFirebaseToken(params.firebase_token)
    let error = params.error;
    if (error) {
      console.log('There was an error during the authentication', error)
    } else {
      if (accessToken && firebaseToken) {
        if (!user) {
          getUser(accessToken).then(userData => {
            console.log(userData);
            setUser(userData);

            firebase.auth().signInWithCustomToken(firebaseToken)
              .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log(user);
                user.updateEmail(userData.email).then(function () {
                  // Update successful.
                }).catch((err) => {
                  console.log(err)
                });

                user.updateProfile({
                  displayName: userData.display_name,
                  photoURL: userData.images[0].url,
                }).catch((err) => {
                  console.log(err)
                });
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
              });
          });
        }
      }
    }
  });

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#1db954',
      },
      secondary: {
        main: '#191414',
      }
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });
  return (

    <div>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <div className="card flexCenterRow TopBar">
            <img className="SpotifyLogo" src="/img/Spotify_Icon_RGB_Green.png"></img>
            <h1 className="TopTitle" >SpotifyQuiz</h1>
          </div>
          <UserContext.Provider value={{ user: user, accessToken: accessToken, refreshToken: refreshToken }}>
            {!user ? <LoginButton /> : <Quiz />}
          </UserContext.Provider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>


    </div>
  );
}

export default App;
