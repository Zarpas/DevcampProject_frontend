import React, { Component } from "react";

import Login from "../auth/login";
import loginImg from "../../../static/assets/images/auth/login.jpg"

export default class Auth extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      adminStatus:false,
      fileStatus:false,
      listStatus:false,
      noteStatus:false,
      pictureStatus:false,
      username:""
    }

    this.handleSuccesfulAuth = this.handleSuccesfulAuth.bind(this);
    this.handleUnsuccesfulAuth = this.handleUnsuccesfulAuth.bind(this);
  }

  handleSuccesfulAuth(username) {
    this.props.handleSuccesfulLogin();
    window.location.reload();
  }

  handleUnsuccesfulAuth() {
    this.props.handleUnsuccesfulLogin();
  }

  render() {
    return (
      <div className="auth-page-wrapper">
        <div className="left-column" style={{backgroundImage: `url(${loginImg})`}} />
        <div className="right-column">
          <Login
            handleSuccesfulAuth={this.handleSuccesfulAuth}
            handleUnsuccesfulAuth={this.handleUnsuccesfulAuth}
            // adminStatus={this.state.adminStatus}
            // fileStatus={this.state.fileStatus}
            // listStatus={this.state.listStatus}
            // noteStatus={this.state.noteStatus}
            // pictureStatus={this.state.pictureStatus}
            // name={this.state.name}
          />
        </div>
      </div>
    );
  }
}
