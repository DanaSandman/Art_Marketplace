import React from 'react';
import { Link } from 'react-router-dom';

export function ArtPreview({ art }) {
  return (
    <div className='art-preview flex'>
      <Link to={`/art/${art._id}`} >
      {/* <Link to={`/art/${art._id}`} replace> */}
        <div className='content-img-card'>
          <img src={art.imgUrl} alt='' />
        </div>
        <div className='content-card flex column'>
          <h4>{art.title}</h4>
          <p>{art.artist.fullname}</p>
          <h5>${art.price}</h5>
        </div>
      </Link>
    </div>
  );
}
