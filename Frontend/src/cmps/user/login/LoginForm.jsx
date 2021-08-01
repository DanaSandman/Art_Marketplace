import React, { Component } from 'react';
import { Button, TextField, Tooltip } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Link } from 'react-router-dom';

export class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    isValidInput: false,
    isTooltipOpen: false,
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

  login = (ev) => {
    ev.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
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

  openTooltip = () => this.setState({ isTooltipOpen: true });
  closeTooltip = () => this.setState({ isTooltipOpen: false });

  render() {
    const { email, password, isValidInput, isTooltipOpen } = this.state;
    return (
      <section className='login-form'>
        <form onSubmit={this.login}>
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
              open={isTooltipOpen}
              onClick={this.openTooltip}
              onOpen={this.openTooltip}
              onClose={this.closeTooltip}
              placement={'left-start'}
              title={
                <p
                  style={{
                    fontSize: '10px',
                    width: '120px',
                    fontFamily: 'neuzeit',
                  }}
                >
                  Minimum eight characters, at least one letter and one number.
                </p>
              }
            >
              <InfoOutlinedIcon />
            </Tooltip>
          </section>
          <Link to='/account/reset'>Forgot your password?</Link>
          <section className='form-btns'>
            <Button variant='outlined' type='submit' disabled={!isValidInput}>
              Login
            </Button>
          </section>
        </form>
      </section>
    );
  }
}
