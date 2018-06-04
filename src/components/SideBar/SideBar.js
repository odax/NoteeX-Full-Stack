import React, { Component } from "react";
import "./side-bar.css";
import LoggedIn from "../LoggedIn/LoggedIn";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";

const isLoggedIn = true;

class SideBar extends Component {
  shouldComponentUpdate = (nextProps, nextState) => false;
  render = () => {
    return (
      <div className="side-bar">
        <div className="side-bar-container">
          <img src={require('./logo.png')} width="100%" height="auto" alt="noteeX logo" />
          {isLoggedIn ?
            <LoggedIn /> : <NotLoggedIn />
          }
        </div>
      </div>
    );
  };
}

export default SideBar;