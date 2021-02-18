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
PORT = 8888
```

Make a .env file in the client directory containing:

```
REACT_APP_BACKEND = http://localhost:8888
PORT = 3000
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

## Deploy
### client

```
npm run build
npm run serve
```

### backend
```
npm run serve
```



## TODOLIST

### Near
- [ ] Add playlist selection
- [ ] Fix uncontrolled component warning
- [x] Add end screen
- [x] Make audio component to clean up question component
- [ ] Add styling
- [x] change URL config for local network accessibility (changed back to WSL1)

### Far
- [ ] Add styling
- [ ] Usability tweaks
- [x] Deploy
- [ ] Add multiplayer




