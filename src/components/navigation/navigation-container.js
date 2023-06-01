import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu";
import Avatar from "@atlaskit/avatar";

const NavigationContainer = (props) => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink exact to={route}>
          {linkText}
        </NavLink>
      </div>
    );
  };

  const handleSignOut = () => {
    const access_token = localStorage.getItem("access-token");
    axios({
      method: "DELETE",
      url: "http://127.0.0.1:5000/api/user/v1.0/logout",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("access-token");
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    const refresh_token = localStorage.getItem("refresh-token");
    axios({
      method: "DELETE",
      url: "http://127.0.0.1:5000/api/user/v1.0/logout",
      headers: {
        Authorization: "Bearer " + refresh_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          localStorage.removeItem("refresh-token");
          props.handleSuccesfulLogout();
          props.history.push("/");
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="nav-wrapper">
      <div className="left-side">My Logo</div>
      <div className="right-side">
        <div className="left-side">
          {props.adminStatus === true ? (
            <DropdownMenu trigger="User Administration">
              <DropdownItemGroup>
                <DropdownItem>
                  {dynamicLink("/user-admin", "User Administration")}
                </DropdownItem>
                <DropdownItem>
                  {props.adminStatus === true
                    ? dynamicLink("/user-new", "New User")
                    : null}
                </DropdownItem>
              </DropdownItemGroup>
            </DropdownMenu>
          ) : null}
          <DropdownMenu trigger="Home">
            <DropdownItemGroup>
              <DropdownItem>{dynamicLink("/", "home")}</DropdownItem>
            </DropdownItemGroup>
          </DropdownMenu>
        </div>
        <div></div>
        {props.loggedInStatus === "LOGGED_IN" ? (
          <div>
            <div className="nav-link-wrapper">
              <DropdownMenu trigger={props.username}>
                <DropdownItemGroup>
                  <DropdownItem>
                    {dynamicLink("/password-manager", "Change Password")}
                  </DropdownItem>
                  <DropdownItem>
                    <div className="nav-link-wrapper">
                      <a onClick={handleSignOut}>LogOut</a>
                    </div>
                  </DropdownItem>
                </DropdownItemGroup>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          dynamicLink("/auth", "Login")
        )}
      </div>
    </div>
  );
};

export default withRouter(NavigationContainer);
