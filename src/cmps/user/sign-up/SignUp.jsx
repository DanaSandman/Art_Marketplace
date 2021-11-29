import { Button } from '@material-ui/core';
import React from 'react';
import { UserForm } from '../UserForm';

export function SignUp({ signup, history }) {
  const cancel = () => history.push('/account/login');
  return (
    <div className='signup'>
      <h3>Create account</h3>
      <UserForm signup={signup} cancel={cancel} />
    </div>
  );
}
