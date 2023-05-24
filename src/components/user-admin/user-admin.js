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
      currentPage: 0,
      isLoading: true,
    };

    this.getUsers = this.getUsers.bind(this);
  }

  getUsers() {
    this.setState({
      currentPage: this.state.currentPage + 1,
      isLoading: true,
    });

    return axios
      .get(
        "http://localhost:5000/api/user/v1.0/get_users",
        { page: this.state.currentPage, per_page: 10 },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("user-admin.js -> getUsers", response);
        this.setState({
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("user-admin.js -> getUsers error", error);
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
