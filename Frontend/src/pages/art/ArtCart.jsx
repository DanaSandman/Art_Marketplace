import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { cartService } from "../../services/cart/cart.service.js";
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
} from "@material-ui/core";
import { EmptyState } from "../../cmps/util/EmptyState.jsx";
// import { removeCartItem } from "../../store/cart/cart.action.js";
import { updateUser, loadUsers } from "../../store/user/user.action.js";
import { CheckoutModal } from "../../cmps/art/CheckoutModal.jsx";
import DeleteIcon from "@material-ui/icons/Delete";

class _ArtCart extends React.Component {
  state = {
    cart: [],
    note: "",
  };

  async componentDidMount() {
    const cart = await cartService.query();
    this.setState({ cart });
    this.initialQuantity(this.state.cart)
  }
  onRemoveItem = async (itemId) => {
    console.log('itemId',itemId);
    let { cart } = this.state;
    cart = await cartService.remove(itemId);
    this.setState({ cart });
  };
  handleChange = ({ target }) => {
    const value = target.value;
    const field = target.name;
    this.setState({ note: value });
  };
  initialQuantity = (cart) => {
    cart.forEach((item, idx) => {
      item.quantity = 1;
    });
  };
  onDecreaseQuantity = (quantity, item) => {
    const { cart } = this.state;
    quantity === 1 ? item.quantity = 1 : item.quantity --
    this.state.cart.forEach((product) => {
      if(item === product)product.quantity = item.quantity;
    }
    );
    this.setState({ cart });
  };
  onIncreaseQuantity = (quantity, item) => {
    const { cart } = this.state;
    quantity === 1 ? item.quantity = 2 : item.quantity ++

    this.state.cart.forEach((product) => {
      if(item === product)product.quantity = item.quantity;
    });
    this.setState({ cart });
  };
  onCheckOut = async () => {
    const { cart } = this.state;
    await this.props.loadUsers()
    const {users, updateUser,} = this.props;
    console.log('users',users);

    let artId = ''
    let artistId = ''
    let quantity = 0
    let artist = {}

    cart.forEach((item, idx) => {
      artId = cart[idx]._id;
      console.log('artId',artId);
      
      artistId = cart[idx].artist._id;
      console.log('artistId',artistId);
      
      quantity = cart[idx].quantity
      console.log('quantity',quantity);
      
      artist = users.find((user) => user._id === artistId);
      console.log('artist',artist);

      // // const buyerId = loggedInUser._id;
      artist.orders.push({
        // buyerId,
        quantity,
        artId
      });
      console.log('artist updated orders',artist.orders);
      updateUser(artist);
    }
    );
    localStorage.removeItem("shoppingCart");
    this.setState({ cart: [] });
  };

  total = () => {
    return this.state.cart.reduce((tot, item) => tot + item.price * (item.quantity || 1)  , 0);
  };

  render() {
    const { cart, note } = this.state;
    // const { user } = this.props;
    const quantity = 1
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
                        <button className="dec-btn" onClick={() =>this.onDecreaseQuantity(this.state.cart[idx].quantity || quantity , cart[idx])}>
                          -
                        </button>
                        <span className="quantity">{ cart[idx].quantity ? (cart[idx].quantity) : (quantity) }</span>
                        <button className="inc-btn" onClick={() =>this.onIncreaseQuantity(this.state.cart[idx].quantity || quantity , cart[idx])}>
                          +
                        </button>
                      </p>
                    </TableCell>
                    <TableCell>${item.price * (cart[idx].quantity || 1)} </TableCell>
                    <TableCell>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon onClick={() => this.onRemoveItem(item._id)}/>
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
          <div className="cart-note">
            <form>
              <h3>Add a Note:</h3>
              <textarea className="add-note" value={note} name="note" onChange={this.handleChange}></textarea>
            </form>
          </div>
          <div className="btn flex">
            <button>
              <Link to={`/art`}> Continue shopping</Link>
            </button>
            <CheckoutModal onCheckOut={this.onCheckOut} />
            {/* <button onClick={this.onCheckOut}> Check out</button>*/}
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ userModule }) {
  return {
    users: userModule.users,
  };
}

const mapDispatchToProps = {
  // removeCartItem,
  updateUser,
  loadUsers,
};

export const ArtCart = connect(mapStateToProps, mapDispatchToProps)(_ArtCart);
