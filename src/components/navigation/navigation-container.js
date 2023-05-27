import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

const NavigationContainer = (props) => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink exact to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  };

  const handleSignOut = () => {
    const access_token = localStorage.getItem("access-token")
    axios({
        method: "DELETE",
        url:"http://127.0.0.1:5000/api/user/v1.0/logout",
        headers: {
          Authorization: 'Bearer ' + access_token
        }
      })
      .then((response) => {
        if (response.status === 200) {
          // props.history.push("/");
          // props.handleSuccesfulLogout();
          localStorage.removeItem("access-token");
        }
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      }
    );
    const refresh_token = localStorage.getItem("refresh-token");
    axios({
        method: "DELETE",
        url:"http://127.0.0.1:5000/api/user/v1.0/logout",
        headers: {
          Authorization: 'Bearer ' + refresh_token
        }
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          localStorage.removeItem("refresh-token");
          props.history.push("/");
          props.handleSuccesfulLogout();
        }
        return response.data;
      }).catch((error) => {
        console.log(error);
      }
    );
  };

  return (
    <div className="right-side">
      {props.loggedInStatus === "LOGGED_IN" ? (
        <a onClick={handleSignOut}>LogOut</a>
      ) : dynamicLink("/auth", "Login") }
    </div>
  )
};

export default withRouter(NavigationContainer);
