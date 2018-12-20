import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../actions";

import './side-bar.css';

const LoggedIn = (props) => {
    return (
      <div>
        <Link to="/">
          <button className="btn1">View Notes</button>
        </Link>
        <Link to="/Add-Note">
          <button className="btn1">+ Add New Note</button>
        </Link>
        <div className='initials'>
          {props.profile.initials}
        </div>
        <button className="btn2" onClick={props.signOut}>Log Out</button>
      </div>
    );
  }

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}
export default connect(null, mapDispatchToProps)(LoggedIn)