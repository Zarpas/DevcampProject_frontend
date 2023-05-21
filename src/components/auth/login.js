import React, { Component } from "react";
import axios from "axios";

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
      .post(
        "http://localhost:5000/api/token/v1.0/auth",
        { id: this.state.id, password: this.state.password },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Login response:", response);
        if (response.data.status === "created") {
          axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.meta.access_csrf_token;
          axios.defaults.headers.common['X-CSRF_REFRESH_TOKEN'] = response.data.meta.refresh_csrf_token;
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
