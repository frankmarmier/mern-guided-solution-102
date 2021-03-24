import React from "react";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  state = {
    password: "",
    email: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props
      .handleSignin({ email: this.state.email, password: this.state.password })
      .catch((err) => {
        this.setState({ message: err.toString() });
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="Login">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          Username:{" "}
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />{" "}
          <br />
          Password:{" "}
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <br />
          <button>Login</button>
        </form>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    );
  }
}

export default Login;
