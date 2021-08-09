import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { EmptyState } from "../../cmps/util/EmptyState.jsx";
import { connect } from "react-redux";
import { wishlistService } from "../../services/wishlist/wishlist.service.js";
import { cartService } from "../../services/cart/cart.service.js";
import { removeWishItem } from "../../store/wishlist/wishlist.action.js";
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
} from "@material-ui/core";
import { updateUser } from "../../store/user/user.action.js";
import DeleteIcon from "@material-ui/icons/Delete";

export function Wishlist() {
  
  const history = useHistory();
  const [cart, setCart] = React.useState([]);

  React.useEffect(async () => {
    setCart(await wishlistService.query());
  }, []);

  const onRemoveItem = async (itemId) => {
    setCart(await wishlistService.remove(itemId));
  };

  const onAddAllToBag = async () => {
    await cartService.addMany(cart);
    history.push("/cart");
  };

  return (
    <section className="shoppingCart flex column">
      <h1 className="cart-title">Wishlist</h1>
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
            {/* {cart && */}
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
            {/* {!cart || cart === [] &&  */}
            {/* } */}
          </TableBody>
        </Table>
      </div>

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
