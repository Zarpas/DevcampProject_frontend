import React, { Component, FC } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DynamicTable from '@atlaskit/dynamic-table';
import { getToken } from '../helpers/use_token';

const head = {
  cells: [
    {
      key: "id",
      content: "Id",
      isSortable: true,
    },
    {
      key: "filename",
      content: "Filename",
      isSortable: true,
    },
    {
      key: "sended",
      content: "Sended",
      isSortable: true,
    },
    {
      key: "processed",
      content: "Processed",
      isSortable: true,
    }
  ]
};

const caption = "Files in Database";

export default class FileAdmin extends Component {
  constructor() {
    super();

    this.state = {
      files: [],
      totalCount: 0,
      currentPage: "0",
      perpage: "20",
      selfLink: "http://127.0.0.1:5000/api/file/v1.0/files",
      nextLink: null,
      prevLink: null,
      isLoading: true,
      sortOrder: "ASC",
      sortKey: "id",
    };

    this.getFiles = this.getFiles.bind(this);
    this.handleOnSort = this.handleOnSort.bind(this);
    this.searchFiles = this.searchFiles.bind(this);
  }

  searchFiles() {
    // add search files form in render and the code to parse it
  }

  handleOnSort(data) {
    console.log("file-admin.js -> handleOnSort() ", data)
    this.setState({
      sortKey: data.sortKey,
      sortOrder: data.sortOrder
    });
  }

  getFiles() {
    const token = getToken("access-token")
    return axios({
      method: "GET",
      url: this.state.selfLink,
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      console.log("file-admin.js -> getFiles() response: ", response);
      this.setState({
        files: response.data.items,
        selfLink: response.data._links.self,
        prevLink: response.data._links.prev,
        nextLink: response.data._links.next,
        totalCount: response.data._meta.total_items,
        
        isLoading: false,
      });
    }).catch((error) => {
      console.log("file-admin.js -> getFiles() error: ", error)
    });
  }

  componentWillMount() {
    this.getFiles();
  }

  render() {
    const rows = this.state.files.map((file) => ({
      key: file.id.toString(),
      cells: [
        {
          key: file.id,
          content: file.id,
        },
        {
          key: file.filename,
          content: file.filename,
        },
        {
          key: file.sended,
          content: file.sended,
        },
        {
          key: file.processed,
          content: file.processed,
        }
      ],
      // return <UserItem key={user.id} user={user} />;
    }));

    return (
      <div style={{ maxWidth: 1024 }}>
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