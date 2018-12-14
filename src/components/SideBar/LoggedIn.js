import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class LoggedIn extends Component {
  render() {
    return (
        <div>
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
    )
  }
}
