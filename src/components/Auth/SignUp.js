import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstname: '',
    lastname: ''
  }
  handleChange = (event) => {
      this.setState({
          [event.target.id]: event.target.value
      })
  }
  handleSubmit = (event) => {
      event.preventDefault();
      console.log(this.state);
  }
  render() {

    const { auth } = this.props;

    if (auth.uid) {
      return <Redirect to='/'/>
    }

    return (
      <div className='SignupContainer'>
        <form onSubmit={this.handleSubmit}>
          <h5>Sign Up</h5>
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
            <label htmlFor='firstName'>
              First Name
            </label>
            <input type='text' id='firstName' onChange={this.handleChange}/>
          </div>
          <div className='input-field'>
            <label htmlFor='lastName'>
              Last Name
            </label>
            <input type='text' id='lastName' onChange={this.handleChange}/>
          </div>
          <div className='input-field'>
            <button>Sign Up</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(SignUp);
