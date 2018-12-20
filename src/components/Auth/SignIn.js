import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import { Redirect } from 'react-router-dom';

import './SignIn.css';

export class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (event) => {
      this.setState({
          [event.target.id]: event.target.value
      })
  }
  handleSubmit = (event) => {
      event.preventDefault();
      this.props.signIn(this.state);
  }
  render() {
    const { authError, auth } = this.props;

    if (auth.uid) {
      return <Redirect to='/'/>
    }

    return (
      <div className='SigninContainer'>
        <form onSubmit={this.handleSubmit}>
          <h5>Sign In</h5>
          <div className='input-field'>
            <label htmlFor='email'>
                Email
            </label>
            <input type='email' id='email' onChange={this.handleChange}/>
          </div>
          <div className='input-field'>
            <label htmlFor='password'>
              Password
            </label>
            <input type='password' id='password' onChange={this.handleChange}/>
          </div>
          <div className='input-field'>
            <button>Login</button>
            <div className='errorText'>
              { authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
