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
    axios.get(
      "http://localhost:5000/api/user/v1.0/user",
      { id: this.state.userID },
      { withCredentials: true }
    )
    .then((reponse) => {
      console.log("getUserDetail ", response);
    })
    .catch((error) => {
      console.log("getUserDetail error ", error);
    });
  }

  componentWillMount() {
    this.getUserDetail();
  }

  render() {
    return <div></div>;
  }
}
