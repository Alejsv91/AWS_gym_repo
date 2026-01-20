import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { useAuthActions } from "../utils/auth";

const Navbar: React.FC = () => {
  const { logout } = useAuthActions();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          GymApp
        </Link>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {ROUTES.filter((r) => r.showInNav).map((route) => (
              <li className="nav-item" key={route.path}>
                <Link className="nav-link" to={route.path}>
                  {route.label}
                </Link>
              </li>
            ))}
            <li className="nav-item" onClick={logout}>
              <button className="nav-link">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
