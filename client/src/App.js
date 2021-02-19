import React, { useState, useEffect } from 'react';
import getHashParams from './services/utils'
import { getPlayLists, getPlayList, getUser } from './services/spotify'
import { LoginButton } from './LoginButton'
import { Quiz } from './Quiz'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import Settings from 'luxon/src/settings.js'

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
  return (

    <div>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <UserContext.Provider value={{ user: user, accessToken: accessToken, refreshToken: refreshToken }}>
          {!user ? <LoginButton /> : <Quiz />}
        </UserContext.Provider>
      </MuiPickersUtilsProvider>

    </div>
  );
}

export default App;
