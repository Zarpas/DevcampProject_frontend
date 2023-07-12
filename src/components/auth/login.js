import React, { Component } from "react";
import axios from "axios";
import { saveToken } from "../helpers/use_token"


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    axios
      .post("http://127.0.0.1:5000/api/user/v1.0/login", {
        id: this.state.id,
        password: this.state.password,
      })
      .then((response) => {
        console.log("Login response:", response);
        if (response.data.status === "created") {
          // localStorage.setItem("access-token", response.data.access_token);
          saveToken("access-token", response.data.access_token)
          // localStorage.setItem("refresh-token", response.data.refresh_token);
          saveToken("refresh-token", response.data.refresh_token)

          this.props.handleSuccesfulAuth();
        } else {
          this.setState({ errorText: "Wrong id or password" });
          this.props.handleUnsuccesfulAuth();
        }
      })
      .catch((error) => {
        console.log("Login error:", error);
        this.setState({ errorText: "An error ocurred" });
      });

    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: "",
    });
  }

  render() {
    return (
      <div>
        <h1>LOGIN TO ACCESS YOUR WORKAREA</h1>

        <div>{this.state.errorText}</div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="id"
            placeholder="Your id"
            value={this.state.id}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
