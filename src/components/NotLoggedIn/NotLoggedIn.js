import React, { Component } from "react";
import "../SideBar/side-bar.css";


class NotLoggedIn extends Component {
    render = () => {
        return (
            <div>
                <form className="new-user">
                    <p>Create New Account</p>
                    <p>username</p>
                    <input />
                    <p>Password</p>
                    <input />
                </form>
                <form className="login-form">
                    <p>Login</p>
                    <p>username</p>
                    <input />
                    <p>Password</p>
                    <input />
                </form>
            </div>
        )
    }

};

export default NotLoggedIn;