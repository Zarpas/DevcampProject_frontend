import axios from "axios";
import React, { Component } from "react";

export default class UserDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: this.props.match.params.slug,
      name: "",
      surnames: "",
      email: "",
      registered: "",
      active: false,
      can_admin: false,
      can_fileupload: false,
      can_listoperate: false,
      can_writenote: false,
      can_takepicture: false,
    };

    this.getUserDetail = this.getUserDetail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    const access_token = localStorage.getItem("access-token");
    axios({
      method: "PATCH",
      url: "http://127.0.0.1:5000/api/user/v1.0/user",
      data: {
        id: this.state.userID,
        can_admin: this.state.can_admin,
        can_fileupload: this.state.can_fileupload,
        can_listoperate: this.state.can_listoperate,
        can_writenote: this.state.can_writenote,
        can_takepicture: this.state.can_takepicture
      },
      headers: {
        Authorization: "Bearer " + access_token,
      }
    })
    .then((response) => {
      console.log("UserDetail -> handleSubmit(): ", response);
    })
    .catch((error) => {
      console.log("UserDetail -> handleSubmit() error: ", error);
    })
    event.preventDefault();
  }

  getUserDetail() {
    const access_token = localStorage.getItem("access-token");
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/api/user/v1.0/user?id=${this.state.userID}`,
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
      .then((response) => {
        console.log("UserDetail -> getUserDetail():", response.data);
        const {
          id,
          name,
          surnames,
          email,
          password_hash,
          registered,
          active,
          can_admin,
          can_fileupload,
          can_listoperate,
          can_writenote,
          can_takepicture,
        } = response.data;
        this.setState({
          name: name,
          surnames: surnames,
          email: email,
          registered: registered,
          active: active,
          can_admin: can_admin,
          can_fileupload: can_fileupload,
          can_listoperate: can_listoperate,
          can_writenote: can_writenote,
          can_takepicture: can_takepicture,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value; // thanks so much StackOverflow!!!
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  componentWillMount() {
    this.getUserDetail();
  }

  render() {
    return (
      <div>
        <div className="nombre">
          {this.state.surnames}, {this.state.name}
        </div>
        <div className="email">{this.state.email}</div>
        <div className="registered">{this.state.registered}</div>
        <form onSubmit={this.handleSubmit} className="user-form-wrapper">
          <div className="two-column">
            <div>
              <input
                type="checkbox"
                name="active"
                placeholder="Active"
                checked={this.state.active}
                onChange={this.handleChange}
              />
              <span>active</span>
            </div>
            <div>
              <input
                type="checkbox"
                name="can_admin"
                placeholder="Can Admin"
                checked={this.state.can_admin}
                onChange={this.handleChange}
              />
              <span>Can admin?</span>
            </div>
          </div>
          <div className="two-column">
            <div>
              <input
                type="checkbox"
                name="can_fileupload"
                placeholder="can_fileupload"
                checked={this.state.can_fileupload}
                onChange={this.handleChange}
              />
              <span>Can upload Files?</span>
            </div>
            <div>
              <input
                type="checkbox"
                name="can_listoperate"
                placeholder="Can listoperate"
                checked={this.state.can_listoperate}
                onChange={this.handleChange}
              />
              <span>Can work with lists?</span>
            </div>
          </div>
          <div className="two-column">
            <div>
              <input
                type="checkbox"
                name="can_takepicture"
                placeholder="can_takepicture"
                checked={this.state.can_takepicture}
                onChange={this.handleChange}
              />
              <span>Can upload pictures?</span>
            </div>
            <div>
              <input
                type="checkbox"
                name="can_writenote"
                placeholder="Can writenote"
                checked={this.state.can_writenote}
                onChange={this.handleChange}
              />
              <span>Can write notes?</span>
            </div>
            <div>
              <button type="submit" className="btn">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
