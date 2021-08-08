import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { cartService } from "../../services/cart/cart.service.js";
import { removeCartItem } from "../../store/cart/cart.action.js";
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
} from "@material-ui/core";
import { EmptyState } from "../../cmps/util/EmptyState.jsx";
import { updateUser } from "../../store/user/user.action.js";
import { CheckoutModal } from "../../cmps/art/CheckoutModal.jsx";
import DeleteIcon from "@material-ui/icons/Delete";

class _ArtCart extends React.Component {
  state = {
    cart: [],
    // note: "",
    quantity: 1,
  };

  async componentDidMount() {
    const cart = await cartService.query();
    this.setState({ cart }, console.log("cart in artcart", this.state.cart));
  }

  onRemoveItem = async (itemId) => {
    let { cart } = this.state;
    cart = await cartService.remove(itemId);
    this.setState({ cart });
  };

  // handleChange = ({ target }) => {
  //   const value = target.value;
  //   const field = target.name;
  //   this.setState({ note: value });
  // };

  onDecrease = (ev) => {
    ev.preventDefault();
    let { quantity } = this.state;
    if (quantity <= 1) return;
    quantity--;
    this.setState({ quantity });
  };

  onIncrease = (ev) => {
    ev.preventDefault();
    let { quantity } = this.state;
    quantity++;
    this.setState({ quantity });
  };

  onCheckOut = () => {
    const { cart } = this.state;
    const { user, users, updateUser } = this.props;
    const artistId = cart[0].artist._id;
    const artist = users.find((user) => user._id === artistId);
    const artId = cart[0]._id;
    const buyerId = user._id;
    artist.orders.push({
      buyerId,
      artId,
    });

    console.log("artist.orders", artist.orders);
    updateUser(artist);
    localStorage.setItem("shoppingCart", []);
    //localStorage.removeItem('shoppingCart');
  };

  total = (item) => {
    return this.state.cart.reduce((tot, item) => tot + item.price, 0);
  };

  render() {
    const { cart, note, quantity } = this.state;
    const { user } = this.props;
    console.log("cart", cart);
    return (
      <section className="shoppingCart flex column">
        <h1 className="cart-title">Shopping cart</h1>

        {
          <div className="cart-list">
            <Table>
              <TableHead className="list-head">
                <TableRow>
                  <TableCell colSpan="2">Artwork</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cart.map((item, idx) => (
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
                      <p className="flex">
                        <button className="dec-btn" onClick={this.onDecrease}>
                          -
                        </button>
                        <span className="quantity">{quantity}</span>
                        <button className="inc-btn" onClick={this.onIncrease}>
                          +
                        </button>
                      </p>
                    </TableCell>
                    <TableCell>${item.price * quantity} </TableCell>
                    <TableCell>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon
                          onClick={() => this.onRemoveItem(item._id)}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
                  <TableRow>
                <div>{`Total - $${this.total()}`}</div>
              </TableRow>
            
            </Table>
          </div>
          // <EmptyState className="empty-state" txt="Your bag is currently empty" />
        }

        <div className="cart-actions">
          {/* <div className="cart-note">
            <form>
              <h3>Add a Note:</h3>
              <textarea className="add-note" value={note} name="note" onChange={this.handleChange}></textarea>
            </form>
          </div> */}
          <div className="btn flex">
            <button>
              <Link to={`/art`}> Continue shopping</Link>
            </button>
            <CheckoutModal onCheckOut={this.onCheckOut} />
            {/* <button onClick={this.onCheckOut}> Check out</button>*/}
          </div>
        </div>
      </section>
    )}
}

function mapStateToProps({ userModule }) {
  return {
    user: userModule.loggedInUser,
    users: userModule.users,
  };
}

const mapDispatchToProps = {
  removeCartItem,
  updateUser,
};

export const ArtCart = connect(mapStateToProps, mapDispatchToProps)(_ArtCart);
