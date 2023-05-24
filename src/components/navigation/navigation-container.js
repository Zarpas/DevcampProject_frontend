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
    
    axios
      .delete("http://localhost:5000/api/user/v1.0/logout", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("logout: ", response)
        if (response.status === 200) {
          props.history.push("/");
          props.handleSuccesfulLogout();
        }
        return response.data;
      })
      .catch((error) => {
        console.log("Error signing out", error);
      });
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
