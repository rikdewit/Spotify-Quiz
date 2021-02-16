import React, { useState, useEffect } from 'react';
import getHashParams from './services/spotify'
import { LoginButton } from './LoginButton'
import { Music } from './Music'

function App() {
  const [count, setCount] = useState(0);
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  useEffect(() => {

    let params = getHashParams();
    setAccessToken(params.access_token)
    setRefreshToken(params.refresh_token)
    let error = params.error;
    if (error) { console.log('There was an error during the authentication', error) }


  });
  return (
    <div>
      {!accessToken ? <LoginButton /> : <Music />}

    </div>
  );
}

export default App;
