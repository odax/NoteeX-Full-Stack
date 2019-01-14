import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { signOut } from "../../actions";
import LoggedInFeed from "./LoggedInFeed";
import './side-bar.css';

class LoggedIn extends Component {
  render() {
    return (
      <div className='container'>
        <div className='button_container'>
        <Link to="/Add-Note">
          <button className="btn1">+ Add New Note</button>
        </Link>
        </div>
        {/* <LoggedInFeed notifications={this.props.notifications}/> */}
        <button className="btn2" onClick={this.props.signOut}>Log Out</button>
      </div>
    );
      }
  }

// const mapStateToProps = (state) => {
//   return {
//     notifications: state.firestore.ordered.notifications
//   }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
        //all the code needed for firebase to sign out
    }
}

// export default compose (
//   connect(mapStateToProps, mapDispatchToProps),
//   firestoreConnect([
//     { collection: 'notifications', limit: 3 }
//   ])
// )(LoggedIn);

export default connect( null, mapDispatchToProps ) (LoggedIn);