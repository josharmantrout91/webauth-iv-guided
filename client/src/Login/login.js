import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  state = {
    username: "sam",
    password: "pass"
  };
  render() {
    return (
      <div>
        <h2>Login Form</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username" />
          <input
            name="username"
            id="username"
            value={this.state.username}
            type="text"
            onChange={this.handleInput}
          />
          <label htmlFor="password" />
          <input
            name="password"
            id="password"
            value={this.state.password}
            type="text"
            onChange={this.handleInput}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const endpoint = "http://localhost:5000/api/auth/login";

    axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
      })
      .catch(err => {
        console.log(err);
      });
  };
}
