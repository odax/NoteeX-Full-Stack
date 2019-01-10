import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../actions";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

import "./SignIn.css";

export class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = name => ({target: {value} }) => {
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.signIn(this.state);
  };
  render() {
    const { authError, auth } = this.props;

    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className="rightScreenContainer">
      <div className="SigninContainer">
        <form onSubmit={this.handleSubmit}>
          <h5>Sign In</h5>
          <div className="input-field">
            <TextField
              id="outlined-name"
              label="email"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('email')}
              required='true'
             />
          </div>
          <div className="input-field">
          <TextField
              id="standard-password-input"
              type="password"
              label="password"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('password')}
              required='true'
             />
          </div>
          <div className="input-field">
            <button>Login</button>
            <div className="errorText">
              {authError ? <p>{authError}</p> : null}
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
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: credentials => dispatch(signIn(credentials))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
