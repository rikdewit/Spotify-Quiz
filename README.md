# Spotify Quiz

## Install  
To use the spotify api, create an application here:
https://developer.spotify.com/dashboard/applications

Make a .env file in the root directory containing:
```
CLIENT_ID = {insert client ID here}
CLIENT_SECRET = {insert client secret here}
REDIRECT_URI = http://localhost:8888/callback
CLIENT_ROOT_URL= http://localhost:3000
```

The frontend and backend are run in seperate shell instances
```
npm install
npm start
```

```
cd client
npm install
npm start
```



