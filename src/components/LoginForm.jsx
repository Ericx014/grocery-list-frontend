const LoginForm = ({
  user,
  setUser,
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
	handleLogout
}) => {
  if (user === null) {
    return (
      <form>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    );
  } else {
    return (
      <section>
        <h4>Welcome {user.name}</h4>;
        <button onClick={handleLogout}>
					Log out
				</button>
      </section>
    );
  }
};

export default LoginForm;
