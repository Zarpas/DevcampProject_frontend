import React, { Component } from "react";
import axios from "axios";
import { getToken } from "../helpers/use_token";

export default class NewCode extends Component {
  constructor() {
    super();

    this.state = {
      listCode: "",
      description: "",
      edition: "",
      revision: "",
      project: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit() {
    const access_token = getToken("access-token");
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/api/codelist/v1.0/codelist",
      data: {
        list_code: this.state.listCode,
        description: this.state.description,
        edition: this.state.edition,
        revision: this.state.revision,
        project: this.state.project
      },
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    })
    .then((resposne) => {
      console.log("new-code.js -> handleSubmit() response:", response);
    })
    .catch((error) => {
      console.log("new-code.js -> handleSubmit() error:", error);
    })
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="list-register-form-wrapper"
        >
          <div className="one-column">
            <input
              type="text"
              name="listCode"
              placeholder="List Code"
              value={ this.state.listCode }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={ this.state.description }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="edition"
              placeholder="Edition"
              value={ this.state.edition }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="revision"
              placeholder="Revision"
              value={ this.state.revision }
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="project"
              placeholder="Project"
              value={ this.state.project }
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <button type="submit" className="btn">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
