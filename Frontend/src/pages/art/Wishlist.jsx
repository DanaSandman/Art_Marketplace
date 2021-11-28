import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { EmptyState } from "../../cmps/util/EmptyState.jsx";
import { wishlistService } from "../../services/wishlist/wishlist.service.js";
import { cartService } from "../../services/cart/cart.service.js";
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from '@material-ui/icons/Check';
import { Button } from '@material-ui/core';

import { MobileTable } from '../../cmps/user/dashboard/tables/MobileTable';


export function Wishlist() {
  
  const history = useHistory();
  const [cart, setCart] = useState([]);
  const [isMobileView, setView] = useState(false);

  useEffect(async () => {
    window.addEventListener("resize", () => setResponsiveness());
    console.log('isMobileView',isMobileView);
    setCart(await wishlistService.query());
  }, []);

   useEffect(() => {
    setResponsiveness();
  }, [isMobileView]);

  const setResponsiveness = () => {
    return window.innerWidth < 900 ? setView(true): setView(false);
  };

  const onRemoveItem = async (itemId) => {
    setCart(await wishlistService.remove(itemId));
  };

  const onAddAllToBag = async () => {
    await cartService.addMany(cart);
    history.push("/cart");
  };

  const getMobileTable = () => {
    const columns = [
      'Title',
      'Item',
      'Price',
      'Quantity',
    ];
      const newLocal = [
          <Button>
              <CheckIcon></CheckIcon>
          </Button>,
      ];
    const data = cart.map((art) => {
      const details = [
        art.title,
        <img className='art-img' src={art.imgUrl} />,
        art.material,
        `${art.price} $`,
        art.quantity
      ];
      const btns = newLocal;
      return { details, btns };
    });
    return { columns, data };
  };

  return (
    <section className="shoppingCart flex column">
    <h1 className="cart-title">Wishlist</h1>
      {isMobileView ? (
          <MobileTable
          table={getMobileTable()}
          emptyTxt="You don't have any orders yet."
          />
          ) : (
        <div className="cart-list">
        <Table>
          <TableHead className="list-head">
            <TableRow>
              <TableCell colSpan="2">Artwork</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart ? (
              cart.map((item, idx) => (
                <TableRow key={`a${idx}`}>
                  <TableCell>
                    <img
                      src={item.imgUrl}
                      alt={item.title}
                      className="cart-item-img"
                    />
                  </TableCell>
                  <TableCell className="item-details">
                    <p className="flex column">
                      <span className="item-title">{item.title}</span>
                      <span className="item-style">{`By ${item.artist.fullname}`}</span>
                      <span>
                        Size: {item.size.width}X{item.size.height}
                      </span>
                    </p>
                  </TableCell>
                  <TableCell>${item.price} </TableCell>
                  <TableCell>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={() => onRemoveItem(item._id)} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ): (
              <div>
                <EmptyState className="empty-state" txt="Your wishlist is currently empty"/>
              </div>
            )}
          </TableBody>
        </Table>
      </div>
      )}
      <div className="cart-actions">
        <div className="btn flex">
          <button>
            <Link to={`/art`}>Continue shopping</Link>
          </button>
          <button className="btn-add-to-bag" onClick={onAddAllToBag}>Add All To Bag</button>
        </div>
      </div>
    </section>
  );
}
