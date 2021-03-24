import React from "react";

import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router";

class MainNavbar extends React.Component {
  state = {
    shown: false,
  };

  handleLogout = () => {
    this.props.handleLogout();
  };

  toggleDisplay = () => {
    this.setState({ shown: !this.state.shown });
  };

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-4">
        <Link className="navbar-brand" to="/">
          MERN Street Art
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={this.toggleDisplay}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={
            "collapse navbar-collapse" + (this.state.shown ? " show" : "")
          }
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/list">
                List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/map">
                Map
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/new-street-art">
                New Street Art
              </NavLink>
            </li>
            {!this.props.isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Signup
                </NavLink>
              </li>
            )}
            {!this.props.isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}
            {this.props.isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={this.handleLogout}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(MainNavbar);
