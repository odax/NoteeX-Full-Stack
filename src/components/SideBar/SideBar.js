import React, { Component } from "react";
import { connect } from 'react-redux';

import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import "./side-bar.css";

class SideBar extends Component {
  render = () => {
    const { auth } = this.props;
    const links = auth.uid ? <LoggedIn /> : <LoggedOut />;
    return (
      <div className="side-bar">
        <div className="side-bar-container">
          <img src={require('./logo.png')} width="100%" height="auto" alt="noteeX logo" />
          { links }
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth
  }
}
export default connect(mapStateToProps)(SideBar);