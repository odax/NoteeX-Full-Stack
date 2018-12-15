import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import "./side-bar.css";

const isLoggedIn = true;

class SideBar extends Component {
  shouldComponentUpdate = (nextProps, nextState) => false;
  render = () => {
    return (
      <div className="side-bar">
        <div className="side-bar-container">
          <img src={require('./logo.png')} width="100%" height="auto" alt="noteeX logo" />
          <LoggedIn/>
          <LoggedOut/>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {

  }
}
export default connect(mapStateToProps)(SideBar);