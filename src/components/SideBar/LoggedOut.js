import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class LoggedOut extends Component {
  render() {
    return (
      <div>
        <Link to="/signin">
          <button className="btn1">Sign In</button>
        </Link>
        <Link to="/signup">
          <button className="btn1">Sign Up</button>
        </Link>
      </div>
    )
  }
}
