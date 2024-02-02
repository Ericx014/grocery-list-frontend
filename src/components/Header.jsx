const NavigationBar = ({user, handleLogout}) => {
  return (
    <header className="header">
      <nav className="navbar">
        <p className="nav-heading">Welcome, {user.username}</p>
				<button className="logout-button" onClick={handleLogout}>Log Out</button>
      </nav>
    </header>
  );
};

export default NavigationBar;
