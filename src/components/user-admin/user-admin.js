import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserItem from "./user-item";

export default class UserAdmin extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      totalCount: 0,
      currentPage: "0",
      isLoading: true,
    };

    this.getUsers = this.getUsers.bind(this);
  }

  getUsers() {
    this.setState({
      currentPage: this.state.currentPage + 1,
      users: [],
      isLoading: true,
    });

    const access_token = localStorage.getItem("access-token");
    const token = "Bearer " + access_token;
    axios.defaults.headers.common["Authorization"] = token;
    return axios
      .get(`http://127.0.0.1:5000/api/user/v1.0/users?page=${this.state.currentPage}`)
      .then((response) => {
        console.log("user-admin.js -> getUsers", response);
        this.setState({
          users: this.state.users.concat(response.data),
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("user-admin.js -> getUsers error", error);
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  componentWillMount() {
    this.getUsers();
  }

  render() {
    const userRecords = this.state.users.map((user) => {
      return <UserItem key={user.id} user={user} />;
    });
    return (
      <div>
        <div className="content-container">{userRecords}</div>
        {this.state.isLoading ? (
          <div className="content-loader">
            <FontAwesomeIcon icon="spinner" spin />
          </div>
        ) : null}
      </div>
    );
  }
}
