import React from 'react';
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { EmptyState } from '../../util/EmptyState';

export function UserOrders({ arts }) {
  console.log('arts', arts);

  return (
    <section className='user-orders'>
      <div>
        <h3>Orders</h3>
      </div>

      {arts.length ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell title={'Title'}>Title</TableCell>
              <TableCell title={'Material'}>Material</TableCell>
              <TableCell title={'Price'}>Price</TableCell>
              {/*  <TableCell>Size</TableCell>*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {arts.map((art) => (
              <TableRow key={art._id}>
                <TableCell>
                  <img
                    src={art.imgUrl}
                    alt={art.imgUrl}
                    className='order-item-img'
                  />
                </TableCell>
                <TableCell title={art.title}>{art.title} </TableCell>
                <TableCell title={art.material}>{art.material} </TableCell>
                <TableCell title={`${art.price} $`}>{art.price} $</TableCell>
                {/* <TableCell>{art.size.height}x{art.size.width} </TableCell>*/}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyState txt="You don't have any orders yet." />
      )}
    </section>
  );
}
