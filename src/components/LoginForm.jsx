import {useState, useEffect} from "react";
import Alert from "./Alert";
import userService from "../services/users";

const LoginForm = ({
  username,
  setUsername,
  setUserList,
  password,
  setPassword,
  handleLogin,
  alert,
  showAlert,
  list,
}) => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    userService.getAll().then((fetchedUsers) => {
      console.log("New user added to list successfully", fetchedUsers);
      setUserList(fetchedUsers);
    });
  }, [isSigningUp]);

  const handleToSignUpButton = (e) => {
    e.preventDefault();
    setIsSigningUp(true);
  };

  const handleToLogInButton = (e) => {
    e.preventDefault();
    setIsSigningUp(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    await userService
      .addUser({
        username: newUsername,
        name: newName,
        password: newPassword,
      })
      setNewName("");
      setNewPassword("");
      setNewUsername("");
      setIsSigningUp(false);
      showAlert(true, "signup", "Account created");
  };

  if (!isSigningUp) {
    return (
      <div className="center-container">
        <form className="login-form">
          <div>
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={list} />
            )}
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
            <button
              className="to-sign-up-button"
              onClick={handleToSignUpButton}
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    );
  } else {
    return (
      <div className="center-container">
        <form className="sign-up-form">
          <h2 className="sign-up-header">Sign Up</h2>
          <div>
            <p className="sign-up-input-header">Username</p>
            <input
              type="text"
              className="sign-up-input"
              value={newUsername}
              onChange={({target}) => setNewUsername(target.value)}
            />
          </div>

          <div>
            <p className="sign-up-input-header">Name</p>
            <input
              type="text"
              className="sign-up-input"
              value={newName}
              onChange={({target}) => setNewName(target.value)}
            />
          </div>

          <div>
            <p className="sign-up-input-header">Password</p>
            <input
              type="password"
              className="sign-up-input"
              value={newPassword}
              onChange={({target}) => setNewPassword(target.value)}
            />
          </div>

          <button
            type="submit"
            className="sign-up-button"
            onClick={handleSignUp}
          >
            Sign up
          </button>

          <p className="log-in-description">
            Have an account?
            <button className="to-log-in-button" onClick={handleToLogInButton}>
              Log in
            </button>
          </p>
        </form>
      </div>
    );
  }
};

export default LoginForm;
