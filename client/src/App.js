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
import { useAuthState } from 'react-firebase-hooks/auth';
import firestore from './services/firebase';


export const UserContext = React.createContext({ user: {}, accessToken: {}, refreshToken: {} });
let auth = firebase.auth();

function App() {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [firebaseToken, setFirebaseToken] = useState();
  const [user, setUser] = useState();
  const [firebaseUser] = useAuthState(auth);

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
            console.log("test")
            auth.signInWithCustomToken(firebaseToken)
              .then((userCredential) => {
                const userRef = firestore.collection('Users').doc(userData.id);
                userRef.set({
                  email: userData.email,
                  displayName: userData.display_name,
                }, { merge: true }).catch(err => console.log(err))

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
            <img width="80px" height="80px" className="top2000Logo" src="/img/npo_radio2_top2000_logo.svg" alt="top 2000 logo"></img>
            <h1 className="TopTitle" >Top 2000 quiz</h1>
          </div>
          <UserContext.Provider value={{ user: user, firebaseUser: firebaseUser, accessToken: accessToken, refreshToken: refreshToken }}>
            {!user ? <LoginButton /> : <Quiz />}
          </UserContext.Provider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>


    </div>
  );
}
export default App;
