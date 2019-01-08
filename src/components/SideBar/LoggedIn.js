import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../actions";
import Button from '@material-ui/core/Button';
import './side-bar.css';

const LoggedIn = (props) => {
    return (
      <div>
        <div className='button_container'>
        <Link to="/Add-Note">
          <Button variant='contained' color='primary' className="btn-no-underline">+ Add New Note</Button>
        </Link>
        </div>
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
        //all the code needed for firebase to sign out
    }
}
export default connect(null, mapDispatchToProps)(LoggedIn)