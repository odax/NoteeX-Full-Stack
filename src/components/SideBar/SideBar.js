import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./side-bar.css";

class SideBar extends Component {
  shouldComponentUpdate = (nextProps, nextState) => false;
  render = () => {
    return (
      <div className="side-bar">
        <div className="side-bar-container">
        <img src={require('./logo.png')} width="100%" height="auto" alt="noteeX logo"/>
          <Link to="/">
            <button className="btn1">View Notes</button>
          </Link>
          <Link to="./Add-Note">
          <button className="btn1">
            + Add New Note
          </button>
          </Link>
          <button className="btn2">
            Log Out
          </button>
        </div>
      </div>
    );
  };
}

export default SideBar;

//render () {
// vs
// render () => {
