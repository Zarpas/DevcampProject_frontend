import axios from "axios";
import React, { Component } from "react";
import { getToken } from "../helpers/use_token";

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
      admin: false,
      fileupload: false,
      listoperate: false,
      writenote: false,
      takepicture: false,
    };

    this.getUserDetail = this.getUserDetail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const access_token = getToken("access-token");
    axios({
      method: "PATCH",
      url: "http://127.0.0.1:5000/api/user/v1.0/user",
      data: {
        id: this.state.userID,
        admin: this.state.admin,
        fileupload: this.state.fileupload,
        listoperate: this.state.listoperate,
        writenote: this.state.writenote,
        takepicture: this.state.takepicture,
      },
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
      .then((response) => {
        console.log("UserDetail -> handleSubmit(): ", response);
      })
      .catch((error) => {
        console.log("UserDetail -> handleSubmit() error: ", error);
      });
    event.preventDefault();
  }

  getUserDetail() {
    const access_token = getToken("access-token");
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/api/user/v1.0/user?id=${this.state.userID}&roles=true`,
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
      .then((response) => {
        console.log("UserDetail -> getUserDetail():", response.data);
        const {
          id,
          username,
          surnames,
          email,
          password_hash,
          registered,
          active,
          admin,
          fileupload,
          listoperate,
          writenote,
          takepicture,
        } = response.data;
        this.setState({
          username: username,
          surnames: surnames,
          email: email,
          registered: registered,
          active: active,
          admin: admin,
          fileupload: fileupload,
          listoperate: listoperate,
          writenote: writenote,
          takepicture: takepicture,
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
          {this.state.surnames}, {this.state.username}
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
                name="admin"
                placeholder="Can Admin"
                checked={this.state.admin}
                onChange={this.handleChange}
              />
              <span>Can admin?</span>
            </div>
          </div>
          <div className="two-column">
            <div>
              <input
                type="checkbox"
                name="fileupload"
                placeholder="can_fileupload"
                checked={this.state.fileupload}
                onChange={this.handleChange}
              />
              <span>Can upload Files?</span>
            </div>
            <div>
              <input
                type="checkbox"
                name="listoperate"
                placeholder="Can listoperate"
                checked={this.state.listoperate}
                onChange={this.handleChange}
              />
              <span>Can work with lists?</span>
            </div>
          </div>
          <div className="two-column">
            <div>
              <input
                type="checkbox"
                name="takepicture"
                placeholder="Can Takepicture"
                checked={this.state.takepicture}
                onChange={this.handleChange}
              />
              <span>Can upload pictures?</span>
            </div>
            <div>
              <input
                type="checkbox"
                name="writenote"
                placeholder="Can writenote"
                checked={this.state.writenote}
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
