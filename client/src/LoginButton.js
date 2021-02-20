
export function LoginButton() {
    return (
        <div>
            <div className="card flexCenterRow TopBar">
                <img className="SpotifyLogo" src="/img/Spotify_Icon_RGB_Green.png"></img>
                <h1 className="TopTitle" >SpotifyQuiz</h1>

            </div>
            <div className="card flexCenterColumn">
                <a href={process.env.REACT_APP_BACKEND + "/login"} className="Spotify">Log in</a>
            </div>
        </div>
    );
}