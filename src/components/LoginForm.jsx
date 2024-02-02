const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  return (
    <div className="center-container">
      <form className="login-form">
        <div>
          <h2 className="login-header">Login</h2>
          <p className="login-input-header">Username</p>
          <input
            className="login-input"
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          <p className="login-input-header">Password</p>
          <input
            className="login-input"
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit" className="login-button" onClick={handleLogin}>
          Login
        </button>
        <p className="sign-up-description">
          Don't have an account yet? 
        <button className="sign-up-button">Sign Up</button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
