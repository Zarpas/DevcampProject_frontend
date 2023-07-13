import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
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
      key: "list_code",
      content: "List Code",
      isSortable: true,
    },
    {
      key: "description",
      content: "Description",
      isSortable: false,
    },
    {
      key: "edition",
      content: "Edition",
      isSortable: true,
    },
    {
      key: "revision",
      content: "Revision",
      isSortable: true,
    },
    {
      key: "project",
      content: "Project",
      isSortable: true
    },
    {
      key: 'more',
    }
  ],
};

const caption = "Lists in Database";

export default class CodelistAdmin extends Component {
  constructor() {
    super();

    this.state = {
      lists: [],
      totalCount: 0,
      pageNumber: 1,
      perpage: "20",
      selfLink: "http://127.0.0.1:5000/api/codelist/v1.0/codelists",
      nextLink: null,
      prevLink: null,
      isLoading: true,
      sortOrder: "ASC",
      sortKey: "id",
    };

    this.getCodes = this.getCodes.bind(this);
    this.handleOnSort = this.handleOnSort.bind(this);
    this.searchCodes = this.searchCodes.bind(this);
  }

  searchCodes() {
    // add search codes form in render and the code to parse it
  }

  handleOnSort(data) {
    this.setState({
      sortKey: data.sortKey,
      sortOrder: data.sortOrder
    })
  }

  getCodes() {
    const access_token = getToken("access-token");
    return axios({
      method: "GET",
      url: this.state.selfLink,
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    })
    .then((response) => {
      console.log("codelist-admin.js -> getCodes() response:", response)
      this.setState({
        lists: response.data.items,
        selfLink: response.data._links.self,
        prevLink: response.data._links.prev,
        nextLink: response.data._links.next,
        totalCount: response.data._meta.total_items,

        isLoading: false,
      });
    })
    .catch((error) => {
      console.log("codelist-admin.js -> getCodes() error:", error)
    })
  }

  componentWillMount() {
    this.getCodes();
  }

  render() {
    const rows = this.state.lists.map((list) => ({
      key: list.id.toString(),
      cells: [
        {
          key: list.id,
          content: list.id,
        },
        {
          key: list.list_code,
          content: list.list_code,
        },
        {
          key: list.description,
          content: list.description,
        },
        {
          key: list.edition,
          content: list.edition,
        },
        {
          key: list.revision,
          content: list.revision,
        },
        {
          key: list.project,
          content: list.project
        },
        {
          key: 'More',
          content: (<Link to={`/code/${list.id}`}>Edit</Link>)
        }
      ],
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