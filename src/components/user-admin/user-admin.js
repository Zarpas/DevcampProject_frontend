import React, { Component, FC } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DynamicTable from "@atlaskit/dynamic-table";
import { getToken } from "../helpers/use_token";


// import UserItem from "./user-item";

const head = {
  cells: [
    {
      key: "id",
      content: "Id",
      isSortable: true,
    },
    {
      key: "username",
      content: "Name",
      isSortable: true,
    },
    {
      key: "surnames",
      content: "Surnames",
      isSortable: true,
    },
    {
      key: 'more',
    }
  ],
};

const caption = "Users in Database";

export default class UserAdmin extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      totalCount: 0,
      pageNumber: 1,
      perpage: "20",
      selfLink: "http://127.0.0.1:5000/api/user/v1.0/users",
      nextLink: null,
      prevLink: null,
      isLoading: true,
      sortOrder: "ASC",
      sortKey: "id",
    };

    this.getUsers = this.getUsers.bind(this);
    this.handleOnSort = this.handleOnSort.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
  }

  searchUsers() {
    // add search users form in render and the code to parse it
  }

  handleOnSort(data) {
    console.log("user-admin.js -> handleOnSort() ", data)
    this.setState({
      sortKey: data.sortKey,
      sortOrder: data.sortOrder
    })
  }

  getUsers() {
    this.setState({
      currentPage: this.state.currentPage + 1,
      users: [],
      isLoading: true,
    });

    const access_token = getToken("access-token");
    return axios({
      method: 'GET',
        url: this.state.selfLink,
        headers: {
          Authorization: 'Bearer ' + access_token
        }
      })
      .then((response) => {
        console.log("user-admin.js -> getUsers", response);
        this.setState({
          users: response.data.items,
          selfLink: response.data._links.self,
          prevLink: response.data._links.prev,
          nextLink: response.data._links.next,
          totalCount: response.data._meta.total_items,
          
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
    const rows = this.state.users.map((user) => ({
      key: user.id.toString(),
      cells: [
        {
          key: user.id,
          content: user.id,
        },
        {
          key: user.username,
          content: user.username,
        },
        {
          key: user.surnames,
          content: user.surnames,
        },
        {
          key: 'More',
          content: (<Link to={`/user/${user.id}`}>Edit</Link>)
        }
      ],
      // return <UserItem key={user.id} user={user} />;
    }));

       
    return (
      <div style={{ maxWidth: "80%" }}>
        <DynamicTable
          caption={caption}
          head={head}
          rows={rows}
          rowsPerPage={20}
          page={this.state.pageNumber}
          loadingSpinnerSize="large"
          isLoading={this.state.isLoading}
          isFixedSize
          sortKey={this.state.sortKey}
          sortOrder={this.state.sortOrder}
          onSetPage={() => console.log("OnSetPage")}
        />
      </div>
    );
  }
}
