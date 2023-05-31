import React, { Component } from "react";
import axios from "axios";


export default class NewUser extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
      surnames: "",
      email: "",
      password: "",
      confirm: "",
      errorTextPassword: "",
      errorTextConfirm: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidationPassword = this.handleValidationPassword.bind(this);
    this.handleValidationConfirm = this.handleValidationConfirm.bind(this);
  }
  

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
  
    });
  }


  handleValidationPassword(event) {
    if (this.state.password.length < 6) {
      this.setState({
        errorTextPassword: "Password must be al least 6 characters"
      });
    } else {
      this.setState({
        errorTextPassword: ""
      })
    }
  }

  handleValidationConfirm(event) {
    if (this.state.password !== this.state.confirm) {
      this.setState({
        errorTextConfirm: "Password have to be equal"
      })
    } else {
      this.setState({
        errorTextConfirm: ""
      })
    }
  }


  handleSubmit(event) {
    const access_token = localStorage.getItem("access-token");
    if (this.state.password != this.state.confirm) {
      this.setState({
        errorTextConfirm: "Password have to be equal"
      });
    } else {
      axios({
        method: "POST",
        url: "http://127.0.0.1:5000/api/user/v1.0/user",
        data: {
          id: this.state.id,
          name: this.state.name,
          surnames: this.state.surnames,
          email: this.state.email,
          password: this.state.password
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
    }
    event.preventDefault();
  }


  render() {

    return (
      <div>
        <form
          onSubmit={ this.handleSubmit }
          className="user-register-form-wrapper"
        >
          <div className="one-column">
            <input
              type="text"
              name="id"
              placeholder="User ID"
              value={ this.state.id }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="name"
              placeholder="User name"
              value={ this.state.name }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="surnames"
              placeholder="User surnames"
              value={ this.state.surnames }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="email"
              placeholder="User email"
              value={ this.state.email }
              onChange={ this.handleChange }
            />
            <input
              type="password"
              name="password"
              placeholder="User password"
              value={ this.state.password }
              onChange={ this.handleChange }
              onKeyUp={ this.handleValidationPassword }
            />
            { this.state.errorTextPassword }
            <input
              type="password"
              name="confirm"
              placeholder="User repeat password"
              value={ this.state.confirm }
              onChange={ this.handleChange }
              onKeyUp={ this.handleValidationConfirm }
            />
            { this.state.errorTextConfirm }
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
