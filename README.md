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
- [x] Fix uncontrolled component warning
- [x] Add end screen
- [x] Make audio component to clean up question component
- [x] Add styling
- [x] Change URL config for local network accessibility (changed back to WSL1)
- [x] Fix displaying track info
- [x] Fix auto submit after time and saving score on next question
- [ ] Fix DatePicker after time
- [x] Add Play button to replay guessed song
- [ ] Fix lock in without picking date
- [x] Add donate button
- [x] Add highscore board
- [ ] Add Score explanation
- [ ] Bigger Year input
- [ ] Fix less than 10 songs bug
- [ ] Fix fast next timer bug
- [x] Add share button
- [x] Tikkie
- [ ] BuyCoffee button styling hover active
- [ ] Mailing list
- [x] Feedback form
- [ ] Integrate login with firebase auth
- [ ] Remove highscores of same person
- [ ] Making the site a PWA
- [ ] Save this song or this playlist
### Far
- [ ] Add multiplayer
- [ ] Add challenges



