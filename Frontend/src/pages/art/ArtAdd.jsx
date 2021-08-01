import React from 'react';
import { connect } from 'react-redux';
import { ArtForm } from '../../cmps/art/ArtForm';
import { saveArt } from '../../store/art/art.action.js';

function _ArtAdd({ history, user, saveArt }) {
  return (
    <section className='add-art-page'>
      <ArtForm history={history} saveArt={saveArt} user={user} />
    </section>
  );
}

function mapStateToProps({ userModule }) {
  return {
    user: userModule.loggedInUser,
  };
}

const mapDispatchToProps = {
  saveArt,
};

export const ArtAdd = connect(mapStateToProps, mapDispatchToProps)(_ArtAdd);
