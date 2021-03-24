import React from "react";
import api from "../../api";
import { Redirect } from "react-router-dom";

class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    message: null,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password,
    };

    api
      .signup(data)
      .then((result) => {
        this.props.history.push("/login");
      })
      .catch((err) => this.setState({ message: err.toString() }));
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="Signup">
        <h2>Signup</h2>
        <form onSubmit={this.handleSubmit}>
          <br />
          Email:{" "}
          <input
            type="text"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
          />{" "}
          <br />
          Password:{" "}
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          />{" "}
          <br />
          <button>Signup</button>
        </form>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    );
  }
}

export default Signup;
