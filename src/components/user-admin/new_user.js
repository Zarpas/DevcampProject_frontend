import React, { Component } from "react";
import axios from "axios";

////////////////////////////////////////////////////////////////////////////
// to-do: improve the way to work with password and confirm password forms//
////////////////////////////////////////////////////////////////////////////


export default class NewUser extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
      surnames: "",
      email: "",
      password1: "",
      password2: "",
      errorText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
  
    });
    let error = "";
    if (this.state.password1 === this.state.password2) {
      error = ""
    } else {
      error = "Both password must be identical"
    }

    this.setState({
      errorText: error
    })
  }

  handleSubmit(event) {
    const access_token = localStorage.getItem("access-token");
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/api/user/v1.0/user",
      data: {
        id: this.state.id,
        name: this.state.name,
        surnames: this.state.surnames,
        email: this.state.email,
        password: this.state.password1
      },
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    })
    .then((response) => {
      console.log("NewUser -> handleSubmit(): ", response);
    })
    .catch((error) => {
      console.log("NewUser -> handleSubmit() error: ", error)
    })
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="user-register-form-wrapper"
        >
          <div className="one-column">
            <input
              type="text"
              name="id"
              placeholder="User ID"
              value={this.state.id}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="name"
              placeholder="User name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="surnames"
              placeholder="User surnames"
              value={this.state.surnames}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="email"
              placeholder="User email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password1"
              placeholder="User password"
              value={this.state.password1}
              onChange={this.handleChange}
            />
            {this.state.errorText}
            <input
              type="password"
              name="password2"
              placeholder="User repeat password"
              value={this.state.password2}
              onChange={this.handleChange}
            />
            {this.state.errorText}
          </div>
          <div>
            <button type="submit" className="btn">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
