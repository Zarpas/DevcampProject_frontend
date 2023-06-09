import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { getToken, saveToken } from "./helpers/use_token";

import NavigationContainer from "./navigation/navigation-container";
import PasswordManager from "./user-admin/password-manager";
import Home from "./pages/home";
import Auth from "./pages/auth";
import UserAdmin from "./user-admin/user-admin";
import UserDetail from "./user-admin/user-detail";
import NoMatch from "./pages/no-match";
import Icons from "./helpers/icons";
import NewUser from "./user-admin/new-user";
import FileAdmin from "./file-admin/file-admin";
import FileDetail from "./file-admin/file-detail";
import NewFile from "./file-admin/new-file";
import CodeDetail from "./code-admin/codelist-detail";
import CodelistAdmin from "./code-admin/codelist-admin";
import NewCode from "./code-admin/new-code";
import WireAdmin from "./wire-admin/wire-admin";
import WireDetail from "./wire-admin/wire-detail";
import NewWire from "./wire-admin/new-wire";

export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      username: "",
      loggedInStatus: "NOT_LOGGED_IN",
      adminStatus: false,
      fileStatus: false,
      listStatus: false,
      noteStatus: false,
      pictureStatus: false,
    };

    this.handleSuccesfulLogin = this.handleSuccesfulLogin.bind(this);
    this.handleUnsuccesfulLogin = this.handleUnsuccesfulLogin.bind(this);
    this.handleSuccesfulLogout = this.handleSuccesfulLogout.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  clearState() {
    this.setState({
      username: "",
      loggedInStatus: "NOT_LOGGED_IN",
      adminStatus: false,
      fileStatus: false,
      listStatus: false,
      noteStatus: false,
      pictureStatus: false,
    });
  }

  handleSuccesfulLogin(username) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
    });
    this.checkLoginStatus();
  }

  handleUnsuccesfulLogin() {
    this.clearState();
  }

  handleSuccesfulLogout() {
    this.clearState();
  }

  checkLoginStatus() {
    const access_token = getToken("access-token");
    console.log("app -> checkLoginStatus access_token ", access_token);
    const refresh_token = getToken("refresh-token");
    console.log("app -> checkLoginStatus refresh_token ", refresh_token);
    if (access_token == null) {
      this.clearState();
    } else {
      axios({
        method: "GET",
        url: "http://127.0.0.1:5000/api/user/v1.0/logged_in",
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
        .then((response) => {
          console.log("App -> checkLoginStatus(): ", response.data);
          const loggedIn = response.data.logged_in;
          const loggedInStatus = this.state.loggedInStatus;

          if (loggedIn && loggedInStatus === "LOGGED_IN") {
            return loggedIn;
          } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
            this.setState({
              loggedInStatus: "LOGGED_IN",
              adminStatus: response.data.admin,
              fileStatus: response.data.fileupload,
              listStatus: response.data.listoperate,
              noteStatus: response.data.writenote,
              pictureStatus: response.data.takepicture,
              username: response.data.username,
            });
          } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
            this.clearState();
          }
        })
        .catch((error) => {
          console.log("App -> checkLoginStatus() error: ", error);
          // refresh token and try again
          axios({
            method: "POST",
            url: "http://127.0.0.1:5000/api/user/v1.0/refresh",
            headers: {
              Authorization: "Bearer " + refresh_token,
            },
          })
            .then((response) => {
              console.log(
                "App -> checkLoginStatus() after token expires: ",
                response.data
              );
              saveToken("access-token", response.data.access_token);
              saveToken("refresh-token", response.data.refresh_token);
              this.checkLoginStatus();
            })
            .catch((error) => {
              console.log("App -> checkLoginStatus() error: ", error);
              this.handleUnsuccesfulLogin();
            });
          // refresh token and try agan (end)
          this.handleUnsuccesfulLogin();
        });
    }
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  loginAuthorizedPages() {
    return [
      <Route key="1" path="/password-manager" component={PasswordManager} />,
    ];
  }

  adminAuthorizedPages() {
    return [
      <Route key="1" path="/user-admin" component={UserAdmin} />,
      <Route key="2" path="/user/:slug" component={UserDetail} />,
      <Route key="3" path="/user-new" component={NewUser} />,
    ];
  }

  fileAuthorizedPages() {
    return [
      <Route key="1" path="/file-admin" component={FileAdmin} />,
      <Route key="2" path="/file/:slug" component={FileDetail} />,
      <Route key="3" path="/file-new" component={NewFile} />,
    ];
  }

  listAuthorizedPages() {
    return [
      <Route key="1" path="/code-admin" component={CodelistAdmin} />,
      <Route key="2" path="/code/:slug" component={CodeDetail} />,
      <Route key="3" path="/code-new" component={NewCode} />,
      <Route key="4" path="/wire-admin" component={WireAdmin} />,
      <Route key="5" path="/wire/:slug" component={WireDetail} />,
      <Route key="6" path="/wire-new" component={NewWire} />,
    ];
  }

  noteAuthorizedPages() {
    return [];
  }

  pictureAuthorizedPages() {
    return [];
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavigationContainer
              loggedInStatus={this.state.loggedInStatus}
              handleSuccesfulLogout={this.handleSuccesfulLogout}
              adminStatus={this.state.adminStatus}
              fileStatus={this.state.fileStatus}
              listStatus={this.state.listStatus}
              noteStatus={this.state.noteStatus}
              pictureStatus={this.state.pictureStatus}
              username={this.state.username}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/auth"
                render={(props) => (
                  <Auth
                    {...props}
                    handleSuccesfulLogin={this.handleSuccesfulLogin}
                    handleUnsuccesfulLogin={this.handleUnsuccesfulLogin}
                  />
                )}
              />
              {this.state.loggedInStatus === "LOGGED_IN"
                ? this.loginAuthorizedPages()
                : null}
              {this.state.adminStatus ? this.adminAuthorizedPages() : null}
              {this.state.fileStatus ? this.fileAuthorizedPages() : null}
              {this.state.listStatus ? this.listAuthorizedPages() : null}
              {this.state.noteStatus ? this.noteAuthorizedPages() : null}
              {this.state.pictureStatus ? this.pictureAuthorizedPages() : null}

              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
