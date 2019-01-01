import React, { Component } from "react";
import { connect } from 'react-redux';

import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import "./side-bar.css";

class SideBar extends Component {
  render = () => {
    const { auth, profile } = this.props;
    const links = auth.uid ? <LoggedIn profile={ profile } /> : <LoggedOut />;
    return (
      <div className="side-bar">
        <div className="side-bar-container">
          <img src={require('./logo.png')} width="100%" height="auto" alt="noteeX logo" />
          <h5>Public Notes V.01</h5>
          { links }
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}
export default connect(mapStateToProps)(SideBar);