import React, { useState, useEffect } from 'react';
import getHashParams from './services/utils'
import { getPlayLists, getPlayList, getUser } from './services/spotify'
import { LoginButton } from './LoginButton'
import { Music } from './Music'

function App() {
  const [count, setCount] = useState(0);
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [user, setUser] = useState();
  const [country, setCountry] = useState();


  useEffect(() => {
    let params = getHashParams();
    setAccessToken(params.access_token)
    setRefreshToken(params.refresh_token)
    let error = params.error;
    if (error) {
      console.log('There was an error during the authentication', error)
    } else {
      if (accessToken) {
        getUser(accessToken).then(userData => {
          setUser(userData.display_name);
          setCountry(userData.country);
        });

      }
    }
  });
  return (
    <div>
      {!accessToken ? <LoginButton /> : <Music user={user} />}

    </div>
  );
}

export default App;
