import React, { Component } from 'react';
import axios from 'axios';
import { DropzoneComponent } from 'react-dropzone-component';
import {getToken} from '../helpers/use_token'

export default class NewFile extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      filename: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.fileRef = React.createRef();
  }

  componentConfig() {
    return {
      iconFileTypes: [".xls", ".xlsx", ".csv", ".txt", ".ods"],
      showFiletypeIcon: true,
      postUrl: "no-url",
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1,
      autoProcessQueue: false,
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  buildForm() {
    let formData = new FormData();

    formData.append("filename", this.state.filename);

    return formData;
  }

  handleSubmit() {
    const token = getToken('access-token')
    axios({
      method: "POST",
      url: 'http://127.0.0.1:5000/api/file/v1.0/file',
      data: this.buildForm(),
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {
      console.log("new-file.js -> handleSubmit() response: ", response)
    }).catch((error) => {
      console.log("new-file.js -> handleSubmit() error: ", error)
    });
  }

  handleFileDrop() {
    return {
      addedfile: (file) => this.setState({ filename: file })
    }
  }

  render() {
    return (
      <div className='file-upload-wrapper'>
        New File
        <form onSubmit={ this.handleSubmit } className='file-upload-form-wrapper'>
          <div className='file-uploaders'>
          <DropzoneComponent
            ref={this.fileRef}
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleFileDrop()}
          >
            <div className='dz-message'>upload File</div>
          </DropzoneComponent>
          </div>

          <button className='btn'>Save</button>
        </form>
      </div>
    );
  }
}