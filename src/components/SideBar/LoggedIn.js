import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../actions";

const LoggedIn = (props) => {
    return (
      <div>
        <Link to="/">
          <button className="btn1">View Notes</button>
        </Link>
        <Link to="./Add-Note">
          <button className="btn1">+ Add New Note</button>
        </Link>
        <a onClick={props.signOut}>Log Out</a>
      </div>
    );
  }

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}
export default connect(null, mapDispatchToProps)(LoggedIn)
