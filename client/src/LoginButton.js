
export function LoginButton() {
    return (
        <div id="login">
            <h1>This is an example of the Authorization Code flow</h1>
            <a href="http://localhost:8888/login" className="btn btn-primary">Log in with Spotify</a>
        </div>
    );
}