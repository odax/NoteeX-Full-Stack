import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../actions";
import TextField from "@material-ui/core/TextField";
import "./SignUp.css";

export class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };
  handleChange = name => ({ target: { value } }) => {
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.signUp(this.state);
  };
  render() {
    const { auth, authError } = this.props;

    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className="rightSideContainer">
        <div className="SignupContainer">
          <form onSubmit={this.handleSubmit}>
            <h5>Sign Up</h5>
            <div className="input-field">
              <TextField
                id="outlined-name"
                label="email"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange("email")}
                required="true"
                className="googleText"
              />
            </div>
            <div className="input-field">
              <TextField
                id="standard-password-input"
                classsName="googleText"
                type="password"
                label="password"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange("password")}
                required="true"
              />
            </div>
            <div className="input-field">
              <TextField
                id="outlined-name"
                label="firstname"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange("firstName")}
                required="true"
                className="googleText"
              />
            </div>
            <div className="input-field">
              <TextField
                id="outlined-name"
                label="lastname"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange("lastName")}
                required="true"
                className="googleText"
              />
            </div>
            <div className="input-field">
              <button>Sign Up</button>
              <div className="signup_error">
                {authError ? <p> {authError} </p> : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => {
      dispatch(signUp(newUser));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
