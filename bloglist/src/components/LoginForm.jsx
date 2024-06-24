const LoginForm = ({handleLogin, username, setUsername, password, setPassword}) => {
    return (
        <div>
            <h1>Login to BlogApp</h1>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                    type = "text"
                    value={username}
                    name="username"
                    onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                    type = "password"
                    value={password}
                    name="password"
                    onChange={({ target }) => setPassword(target.value)}
                    />    
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm