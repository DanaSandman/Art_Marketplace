import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Tooltip } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

export class ResetPassword extends Component {
  state = {
    email: '',
    password: '',
    isValidInput: false,
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState({ [field]: value }, () => {
      const { email, password } = this.state;
      let isValid =
        this.validateEmail(email) && this.validatePassword(password);
      this.setState({ isValidInput: isValid });
    });
  };

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(String(password).toLowerCase());
  };

  reset = (ev) => {
    ev.preventDefault();
    const { email, password } = this.state;
    const { history, resetPassword } = this.props;
    resetPassword(email, password);
    history.push('/account/login');
  };

  render() {
    const { email, password, isValidInput } = this.state;
    return (
      <div className='reset-password'>
        <h3>Reset Password</h3>
        <form onSubmit={this.reset}>
          <TextField
            label='Email'
            variant='outlined'
            name='email'
            value={email}
            onChange={this.handleChange}
            required
          />
          <section>
            <TextField
              label='Password'
              variant='outlined'
              name='password'
              value={password}
              onChange={this.handleChange}
              required
            />
            <Tooltip
              title={
                <p>
                  Minimum eight characters, at least one letter and one number.
                </p>
              }
            >
              <InfoOutlinedIcon />
            </Tooltip>
          </section>
          <section className='form-btns'>
            <Link to='/account/login'>
              <Button variant='outlined'>Cancel</Button>
            </Link>
            <Button variant='outlined' type='submit' disabled={!isValidInput}>
              Submit
            </Button>
          </section>
        </form>
      </div>
    );
  }
}
