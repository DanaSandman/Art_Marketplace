import React from "react";

import { Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

import { MobileTable } from './tables/MobileTable';
import { DesktopTable } from './tables/DesktopTable';

export function UserOrders({ arts, isMobileView }) {
  console.log("arts", arts);

  const getDesktopTable = () => {
    const columns = [
      'Item',
      'Title',
      'Material',
      'Price',
      'Quantity',
      'Completed'
    ];
    const data = arts.map((art) => {
      return {
        details: [
          <img className='art-img' src={art.art.imgUrl} />,
          art.art.title,
          art.art.material,
          `${art.art.price} $`,
          art.quantity,
          // `${art.art.size.height}x${art.art.size.width} cm`,
          // <Button onClick={() => removeArt(art._id)}
          <Button>
        <CheckIcon></CheckIcon>
          </Button>,
        ],
      };
    });
    return { columns, data };
  };
  const getMobileTable = () => {
    const columns = [
      'Title',
      'Item',
      'Material',
      'Price',
      'Quantity',
    ];
    const data = arts.map((art) => {
      const details = [
        art.art.title,
        <img className='art-img' src={art.art.imgUrl} />,
        art.art.material,
        `${art.art.price} $`,
        art.quantity,
        // `${art.art.size.height}x${art.art.size.width} cm`,
      ];
      const btns = [
        // <Button onClick={() => removeArt(art.art._id)}>
        <Button>
          <CheckIcon></CheckIcon>
        </Button>,
      ];
      return { details, btns };
    });
    return { columns, data };
  };
  return (
    <section className='user-arts'>
      <section className='content'>
        {isMobileView ? (
          <MobileTable
          table={getMobileTable()}
          emptyTxt="You don't have any orders yet."
          />
          ) : (
            <DesktopTable
            table={getDesktopTable()}
            emptyTxt="You don't have any orders yet."
            />
            )}
      </section>
    </section>
  );
}
