import React from 'react';
import { Avatar as AltAvatar } from '@material-ui/core';

export function Avatar({ imgUrl, fullname }) {
  if (imgUrl) return <img className='avatar' src={imgUrl} alt='avatar' />;
  else return <AltAvatar src='/img' alt={fullname} />;
}
