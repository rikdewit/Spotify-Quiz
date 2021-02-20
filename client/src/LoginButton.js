
export function LoginButton() {
    return (
        <div className="card flexCenterColumn">
            <h1>Spotify Quiz</h1>
            <br></br>
            <a href={process.env.REACT_APP_BACKEND + "/login"} className="Spotify">Log in</a>
        </div>
    );
}