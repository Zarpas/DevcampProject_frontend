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
// import {getToken, saveToken, removeToken } from "./helpers/use_token";

export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
    };

    this.handleSuccesfulLogin = this.handleSuccesfulLogin.bind(this);
    this.handleUnsuccesfulLogin = this.handleUnsuccesfulLogin.bind(this);
    this.handleSuccesfulLogout = this.handleSuccesfulLogout.bind(this);
  }


  handleSuccesfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN",
    });
  }

  handleUnsuccesfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
  }

  handleSuccesfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      can_admin: false
    });
  }

  checkLoginStatus() {

    const access_token = localStorage.getItem("access-token")
    if (access_token === null) {
      return axios
      .get("http://localhost:5000/api/user/v1.0/logged_in")
      .then((response) => {
        console.log("checkLoginStatus", response);
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN",
          });
        } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
          });
        }

      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      return axios({
        method: "GET",
        url:"http://127.0.0.1:5000/api/user/v1.0/logged_in",
        headers: {
          Authorization: 'Bearer ' + access_token
        }
      })
      .then((response) => {
        console.log(response.data);
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN",
          });
        } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
          });
        }
      }).catch((error) => {
        console.log(error);
      })
    } 
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [
      <Route key="1" path="/password-manager" component={PasswordManager} />,
      <Route key="2" path="/user-admin" component={UserAdmin} />,
      <Route key="3" path="/user/:slug" component={UserDetail} />
    ]
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavigationContainer loggedInStatus={this.state.loggedInStatus} handleSuccesfulLogout={this.handleSuccesfulLogout} />
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
              {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages(): null}

              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
