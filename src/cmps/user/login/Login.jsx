import React, { Component } from 'react';
import { LoginForm } from './LoginForm';
import { Link } from 'react-router-dom';

export class Login extends Component {
  render() {
    return (
      <div className='login'>
        <h3>Log In</h3>
        <LoginForm login={this.props.login} />
        <Link to='/account/signup'>Create account</Link>
      </div>
    );
  }
}
