import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../actions";
import './side-bar.css';

const LoggedIn = (props) => {
    return (
      <div className='container'>
        <div className='button_container'>
        <Link to="/Add-Note">
          <button className="btn1">+ Add New Note</button>
        </Link>
        </div>
        {/* <div className='initials'>
          {props.profile.initials}
        </div> */}
        <button className="btn2" onClick={props.signOut}>Log Out</button>
      </div>
    );
  }

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
        //all the code needed for firebase to sign out
    }
}
export default connect(null, mapDispatchToProps)(LoggedIn)