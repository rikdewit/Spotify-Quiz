
export function LoginButton() {
    return (
        <div>
            <div className="card flexCenterColumn">
                <a href={process.env.REACT_APP_BACKEND + "/login"} className="Spotify">Log in</a>
            </div>
        </div>
    );
}