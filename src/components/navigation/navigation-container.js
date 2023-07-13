import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu";
import { getToken, removeToken } from "../helpers/use_token"
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
    const access_token = getToken("access-token");
    axios({
      method: "DELETE",
      url: "http://127.0.0.1:5000/api/user/v1.0/logout",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          removeToken("access-token");
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    const refresh_token = getToken("refresh-token");
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
          removeToken("refresh-token");
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
        <div className="menu-side">
          {props.adminStatus === true ? (
            <DropdownMenu trigger="User Administration">
              <DropdownItemGroup>
                <DropdownItem>
                  {dynamicLink("/user-admin", "User Administration")}
                </DropdownItem>
                <DropdownItem>
                  {dynamicLink("/user-new", "New User")}
                </DropdownItem>
              </DropdownItemGroup>
            </DropdownMenu>
          ) : null}
          {props.fileStatus === true ? (
            <DropdownMenu trigger="File Administration">
              <DropdownItemGroup>
                <DropdownItem>
                  {dynamicLink("/file-admin", "File Administration")}
                </DropdownItem>
                <DropdownItem>
                  {dynamicLink("/file-new", "New File")}
                </DropdownItem>
              </DropdownItemGroup>
            </DropdownMenu>
          ) : null}
          {props.listStatus === true ? (
            <DropdownMenu trigger="List Administration">
              <DropdownItemGroup>
                <DropdownItem>
                  {dynamicLink("/code-admin", "List Code Administration")}
                </DropdownItem>
                <DropdownItem>
                  {dynamicLink("/code-new", "New Code")}
                </DropdownItem>
                <DropdownItem>
                  {dynamicLink("/wire-admin", "Wire List Administration")}
                </DropdownItem>
                <DropdownItem>
                  {dynamicLink("/wire-new", "New Wire")}
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
