import React, { useState, useEffect } from 'react';
import getHashParams from './services/utils'
import { getPlayLists, getPlayList, getUser } from './services/spotify'
import { LoginButton } from './LoginButton'
import { Music } from './Music'

export const UserContext = React.createContext({ user: {}, accessToken: {} });

function App() {
  const [count, setCount] = useState(0);
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
      <UserContext.Provider value={{ user: user, accessToken: accessToken, refreshToken: refreshToken }}>
        {!user ? <LoginButton /> : <Music />}
      </UserContext.Provider>
    </div>
  );
}

export default App;
