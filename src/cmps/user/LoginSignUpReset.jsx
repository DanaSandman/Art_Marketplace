import React, { Component } from 'react';
import { Login } from './login/Login.jsx';
import { SignUp } from './sign-up/SignUp';
import { ResetPassword } from './reset/ResetPassword';

export class LoginSignUpReset extends Component {
  state = {
    currTab: 'login',
  };

  componentDidMount() {
    const { tab } = this.props;
    if (tab) {
      this.setCurrTab(tab);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tab !== this.props.tab) {
      this.setCurrTab(this.props.tab);
    }
  }

  setCurrTab = (tab) => {
    this.setState({ currTab: tab });
    this.props.history.push(`/account/${tab}`);
  };

  getCurrTab = () => {
    const { currTab } = this.state;
    const { login, signup, resetPassword, history } = this.props;

    switch (currTab) {
      case 'login':
        return <Login login={login} history={history} />;
      case 'signup':
        return <SignUp signup={signup} history={history} />;
      case 'reset':
        return (
          <ResetPassword history={history} resetPassword={resetPassword} />
        );
      default:
        return <Login login={login} history={history} />;
    }
  };
  render() {
    return this.getCurrTab();
  }
}
