import React, { Component } from 'react';
import axios from 'axios';
import { getToken } from '../helpers/use_token';

export default class FileDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fileId: this.props.match.params.slug,
      filename: ''
    };

    this.getFileDetail = this.getFileDetail.bind(this);
  }

  getFileDetail() {
    const access_token = getToken('access-token');
    return axios({
      method: "GET",
      url: `http://127.0.0.1:5000/api/file/v1.0/file?id=${this.state.fileId}`,
      headers: {
        Authorization: "Bearer " + access_token,
      }
    }).then((response) => {
      console.log("FileDetail -> getFileDetail(): ", response.data);
      const { id, filename, sended, processed } = response.data;
      this.setState({
        filename: filename,
        sended: sended,
        processed: processed
      })
    })
  }

  componentWillMount() {
    this.getFileDetail();
  }

  render() {
    return (
      <div>
        File Detail of 
        <p>Id: {this.state.fileId}</p>
        <p>File: {this.state.filename}</p>
        <p>Sended: {this.state.sended}</p>
        <p>Processed: {(this.state.processed?"true":"false")}</p>
      </div>
    );
  }
}