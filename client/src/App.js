import React, { useState, useEffect } from 'react';
import getHashParams from './services/utils'
import { getPlayLists, getPlayList, getUser } from './services/spotify'
import { LoginButton } from './LoginButton'
import { Quiz } from './Quiz'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export const UserContext = React.createContext({ user: {}, accessToken: {} });

function App() {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    let params = getHashParams();
    setAccessToken(params.access_token)
    setRefreshToken(params.refresh_token)
    let error = params.error;
    if (error) {
      console.log('There was an error during the authentication', error)
    } else {
      if (accessToken) {
        if (!user) {
          getUser(accessToken).then(userData => {
            console.log(userData);
            setUser(userData);
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
        // main: '#ffff',
        main: '#191414',


      }
    }
  });
  return (

    <div>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <UserContext.Provider value={{ user: user, accessToken: accessToken, refreshToken: refreshToken }}>
            {!user ? <LoginButton /> : <Quiz />}
          </UserContext.Provider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>


    </div>
  );
}

export default App;
