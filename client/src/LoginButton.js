
export function LoginButton() {
    return (
        <div id="login">
            <h1>Spotify Quiz</h1>
            <a href={process.env.REACT_APP_BACKEND + "/login"} className="Spotify">Log in with Spotify</a>
        </div>
    );
}