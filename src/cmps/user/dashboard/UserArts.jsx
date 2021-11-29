import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ImageIcon from '@material-ui/icons/Image';
import { MobileTable } from './tables/MobileTable';
import { DesktopTable } from './tables/DesktopTable';

export function UserArts({ arts, removeArt, isMobileView }) {
  const getDesktopTable = () => {
    const columns = [
      'Thumbnail',
      'Title',
      'Description',
      'Category',
      'Material',
      'Technique',
      'Style',
      'Size',
      'Color',
      'Price',
      'Edit',
      'Delete',
    ];
    const data = arts.map((art) => {
      return {
        details: [
          <img className='art-img' src={art.imgUrl} />,
          art.title,
          art.description,
          art.category,
          art.material,
          art.technique,
          art.style,
          `${art.size.height}x${art.size.width} cm`,
          art.color,
          `${art.price} $`,
          <Link to={`/art/edit/${art._id}`}>
            <EditIcon />
          </Link>,
          <Button onClick={() => removeArt(art._id)}>
            <DeleteIcon />
          </Button>,
        ],
      };
    });
    return { columns, data };
  };
  const getMobileTable = () => {
    const columns = [
      'Title',
      'Thumbnail',
      'Description',
      'Category',
      'Material',
      'Technique',
      'Style',
      'Size',
      'Color',
      'Price',
    ];
    const data = arts.map((art) => {
      const details = [
        art.title,
        <img className='art-img' src={art.imgUrl} />,
        art.description,
        art.category,
        art.material,
        art.technique,
        art.style,
        `${art.size.height}x${art.size.width} cm`,
        art.color,
        `${art.price} $`,
      ];
      const btns = [
        <Link to={`/art/edit/${art._id}`}>
          <EditIcon />
        </Link>,
        <Button onClick={() => removeArt(art._id)}>
          <DeleteIcon />
        </Button>,
      ];
      return { details, btns };
    });
    return { columns, data };
  };
  return (
    <section className='user-arts'>
      <section className='header'>
        <h3>Artworks</h3>
        <Link to={'/art/add'}>
          <Button className='art-add-btn' variant='outlined'>
            Add
          </Button>
        </Link>
      </section>
      <section className='content'>
        {isMobileView ? (
          <MobileTable
            table={getMobileTable()}
            emptyTxt="You don't have any artworks yet. You can add through the 'Add' button above."
          />
        ) : (
          <DesktopTable
            table={getDesktopTable()}
            emptyTxt="You don't have any artworks yet. You can add through the 'Add' button above."
          />
        )}
      </section>
    </section>
  );
}
