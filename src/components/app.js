import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import NavigationContainer from "./navigation/navigation-container";
import PasswordManager from "./user-admin/password-manager";
import Home from "./pages/home";
import Auth from "./pages/auth";
import UserAdmin from "./user-admin/user-admin";
import UserDetail from "./user-admin/user-detail";
import NoMatch from "./pages/no-match";
import Icons from "./helpers/icons";
import NewUser from "./user-admin/new_user";

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
    })
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
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const access_token = localStorage.getItem("access-token");
    if (access_token === null) {
      this.clearState();
    } else {
      return axios({
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
              adminStatus: response.data.can_admin,
              fileStatus: response.data.can_fileupload,
              listStatus: response.data.can_listoperate,
              noteStatus: response.data.can_writenote,
              pictureStatus: response.data.can_takepicture,
              username: response.data.name,
            });
          } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
            this.clearState();
          }
        })
        .catch((error) => {
          console.log("App -> checkLoginStatus() error: ", error);
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
    return [];
  }

  listAuthorizedPages() {
    return [];
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
