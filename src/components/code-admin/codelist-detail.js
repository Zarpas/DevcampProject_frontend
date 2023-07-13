import React, { Component } from "react";
import axios from "axios";
import { getToken } from "../helpers/use_token";

export default class CodeDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listID: this.props.match.params.slug,
      listCode: "",
      description: "",
      edition: "",
      revision: "",
      project: "",
    };
    this.getListDetail = this.getListDetail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const access_token = getToken("access-token");
    axios({
      method: "PATCH",
      url: "http://127.0.0.1:5000/api/codelist/v1.0/codelist",
      data: {
        list_code: this.state.listCode,
        description: this.state.description,
        edition: this.state.edition,
        revision: this.state.revision,
        project: this.state.project,
      },
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
    .then((response) => {
      console.log("codelist-detail.js -> handleSubmit() response:", response);
    })
    .catch((error) => {
      console.log("codelist-detail.js -> handleSubmit() error:", error)
    })
  }

  getListDetail() {
    const access_token = getToken("acces-token");
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/api/codelist/v1.0/codelist?id=${this.state.listID}`,
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
      .then((response) => {
        console.log(
          "codelist-detail.js -> getListDetail() response:",
          response
        );
        const { id, list_code, description, edition, revision, project } =
          response.data;
        this.setState({
          listCode: list_code,
          description: description,
          edition: edition,
          revision: revision,
          project: project,
        });
      })
      .catch((error) => {
        console.log("codelist-detail.js -> getListDetail() error:", error);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentWillMount() {
    this.getListDetail();
  }

  render() {
    return (
      <div>
        <form
          onSubmit={ this.handleSubmit }
          className="list-register-form-wrapper"
        >
          <div className="one-column">
            <input
              type="text"
              name="listCode"
              placeholder="List code"
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
