import axios from "axios";
import React, { Component } from "react";

export default class UserDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: this.props.match.params.slug,
      user: {},
    };
  }

  getUserDetail() {
    const access_token = localStorage.getItem("access-token")
    axios({
      method: "GET",
      url:`http://127.0.0.1:5000/api/user/v1.0/user?id=${this.state.userID}`,
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    })
    .then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  componentWillMount() {
    this.getUserDetail();
  }

  render() {
    return <div></div>;
  }
}
