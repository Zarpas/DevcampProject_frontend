import React, { Component } from 'react';
import axios from 'axios';

export default class PasswordManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: "",
      new_password1: "",
      new_password2: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: "",
    })
  }

  handleSubmit(event) {
    const access_token = localStorage.getItem("access-token")
    if (this.state.new_password1 === this.state.new_password2) {
      // axios
      //   .patch(
      //     "http://localhost:5000/api/user/v1.0/new_password",
      //     { old_password: this.state.old_password, new_password: this.state.new_password1 }
      //   )
      axios({
        method: "PATCH",
        url:"http://127.0.0.1:5000/api/user/v1.0/new_password",
        data: {
          old_password: this.state.old_password, 
          new_password: this.state.new_password1
        },
        headers: {
          Authorization: 'Bearer ' + access_token
        }
      })
      .then((response) => {
        console.log("PasswordManager response:", response);
        if (response.data.status === "created") {
            this.setState({ errorText: "Password changed"})
        } else {
          this.setState({ errorText: "Wrong id or password" });
        }
      })
      .catch((error) => {
        console.log("Login error:", error);
        this.setState({ errorText: "An error ocurred" });
      });
    } else {
      this.setState({
        errorText: "New password have to be equals."
      })
    }

    event.preventDefault();
    // this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h1>CHANGE YOUR ACCESS PASSWORD</h1>

          <div>{this.state.errorText}</div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="password"
              name="old_password"
              placeholder="Your actual password"
              value={this.state.old_password}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="new_password1"
              placeholder="Your new password"
              value={this.state.new_password1}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="new_password2"
              placeholder="Repeat your new password"
              value={this.state.new_password2}
              onChange={this.handleChange}
            />
            <div>
              <button type="submit">Send</button>
            </div>
          </form>
      </div>
    );
  }
}