import React from "react";
// import {
//   Table,
//   TableRow,
//   TableHead,
//   TableCell,
//   TableBody,
// } from "@material-ui/core";
// לא צריך אותם אולי נשאיר רק את המחיקה 
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { MobileTable } from './tables/MobileTable';
import { DesktopTable } from './tables/DesktopTable';

export function UserOrders({ arts, isMobileView }) {
  console.log("arts", arts);

  const getDesktopTable = () => {
    const columns = [
      'Title',
      'Material',
      'Price',
      'Quantity',
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
          // <Button onClick={() => removeArt(art._id)}>
          //   <DeleteIcon />
          // </Button>,
        ],
      };
    });
    return { columns, data };
  };
  const getMobileTable = () => {
    const columns = [
      'Item',
      'Title',
      'Material',
      'Price',
      'Quantity',
    ];
    const data = arts.map((art) => {
      const details = [
        <img className='art-img' src={art.art.imgUrl} />,
        art.art.title,
        art.art.material,
        `${art.art.price} $`,
        art.quantity,
        // `${art.art.size.height}x${art.art.size.width} cm`,
      ];
      const btns = [
        <Link to={`/art/edit/${art.art._id}`}>
          <EditIcon />
        </Link>,
        // <Button onClick={() => removeArt(art.art._id)}>
        <Button>
          <DeleteIcon />
        </Button>,
      ];
      // return { details };
      return { details, btns };
    });
    return { columns, data };
  };
  return (
    <section className='user-arts'>
      {/* <section className='header'>
      </section> */}
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





  // return (
  //   <section className="user-orders">
  //     <div>
  //       <h3>Orders</h3>
  //     </div>

  //     {arts.length ? (
  //       <Table>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell></TableCell>
  //             <TableCell title={"Title"}>Title</TableCell>
  //             <TableCell title={"Material"}>Material</TableCell>
  //             <TableCell title={"Price"}>Price</TableCell>
  //             <TableCell title={"Quantity"}>Quantity</TableCell>
  //             {/*  <TableCell>Size</TableCell>*/}
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {arts.map((art) => (
  //             <TableRow key={art.art._id}>
  //               <TableCell>
  //                 <img
  //                   src={art.art.imgUrl}
  //                   alt={art.art.imgUrl}
  //                   className="order-item-img"
  //                 />
  //               </TableCell>
  //               <TableCell title={art.art.title}>{art.art.title} </TableCell>
  //               <TableCell title={art.art.material}>
  //                 {art.art.material}{" "}
  //               </TableCell>
  //               <TableCell title={`${art.art.price} $`}>
  //                 {art.art.price} $
  //               </TableCell>
  //               <TableCell title={`${art.quantity} `}>
  //                 {art.quantity}{" "}
  //               </TableCell>
  //               {/* <TableCell>{art.size.height}x{art.size.width} </TableCell>*/}
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //     ) : (
  //       <EmptyState txt="You don't have any orders yet." />
  //     )}
  //   </section>
  // );
}
