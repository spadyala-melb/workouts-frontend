import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/">Workout Buddy</Link>
      </div>
      <div>
        {!user && (
          <div className="navbar-links">
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/signup" className="navbar-link btn-secondary">
              Signup
            </Link>
          </div>
        )}
        {user && (
          <div className="navbar-links">
            <span>{user.email}</span>
            <Link
              to="/logout"
              className="navbar-link btn-secondary"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
