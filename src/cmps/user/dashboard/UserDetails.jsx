import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { UserForm } from '../UserForm';
import { Avatar } from '../../util/Avatar';

export class UserDetails extends Component {
  state = { isEditing: false };
  editModeOn = () => this.setState({ isEditing: true });
  editModeOff = () => this.setState({ isEditing: false });

  render() {
    const { email, password, fullname, imgUrl } = this.props.user;
    const { isEditing } = this.state;
    return (
      <section className={`user-details ${isEditing ? 'edit-mode' : ''}`}>
        {isEditing ? (
          <UserForm
            user={this.props.user}
            updateUser={this.props.updateUser}
            editModeOff={this.editModeOff}
          />
        ) : (
          <>
            <h2>Hello, {fullname}</h2>
            <Avatar imgUrl={imgUrl} fullname={fullname} />
            <ul>
              <li>
                <span>Email:</span>
                <span>{email}</span>
              </li>
              <li>
                <span>Full name:</span>
                <span>{fullname}</span>
              </li>
              <li>
                <span>Password:</span>
                <span>{password}</span>
              </li>
            </ul>
            <Button variant='outlined' onClick={this.editModeOn}>
              <EditIcon />
            </Button>
          </>
        )}
      </section>
    );
  }
}
