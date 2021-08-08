import React from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { wishlistService } from '../../services/wishlist/wishlist.service.js'
import { cartService } from "../../services/cart/cart.service.js";
import { removeWishItem } from '../../store/wishlist/wishlist.action.js'
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  IconButton
} from '@material-ui/core';
import { updateUser } from '../../store/user/user.action.js';
import DeleteIcon from '@material-ui/icons/Delete';




export function Wishlist() {

const history = useHistory();

  const [cart, setCart] = React.useState([])
  const [shoppingBag, setShoppingBag] = React.useState(false)

  React.useEffect(async () => {
    setCart(await wishlistService.query())
  }, [])



  const onRemoveItem = async (itemId) => {
    setCart(await wishlistService.remove(itemId))
  }

  const onAddAllToBag = async () => {
    await cartService.addMany(cart)
    history.push("/cart");
    // setShoppingBag(true)
  }

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
                {cart && cart.map((item, idx) => (
                  <TableRow key={`a${idx}`}>
                    <TableCell>
                      <img src={item.imgUrl} alt={item.title} className="cart-item-img" />
                    </TableCell>
                    <TableCell className="item-details">
                      <p className="flex column">
                      <span className="item-title">{item.title}</span>
                      <span className="item-style">{`By ${item.artist.fullname}`}</span>
                      <span>Size: {item.size.width}X{item.size.height}</span>
                      </p>
                    </TableCell>
                    <TableCell>${item.price} </TableCell>
                    <TableCell>
                    <IconButton edge="end" aria-label="delete">
                    <DeleteIcon onClick={() => onRemoveItem(item._id)} /> 
                    </IconButton>
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        
        {/* <div>
            <EmptyState className="empty-state" txt="Your bag is currently empty" />
        </div> */}

        <div className="cart-actions">
          <div className="btn flex">
            <button><Link to={`/art`}>Continue shopping</Link></button>
            {/* <CheckoutModal  onCheckOut={this.onCheckOut}/> */}
             <button onClick={onAddAllToBag}>
             Add All To Bag
             </button>

             
             {/* {shoppingBag === true && 
          <Link  to={`/cart`} ></Link>}  */}
             
            

            
          </div>
        </div>
      </section>
    );
  }


// class _WishList extends React.Component {

//   state = {
//     cart: [],
//     shoppingBag: false
//   }

//   async componentDidMount() {
//     // const history = useHistory();
//     const cart = await wishlistService.query()
//     this.setState({ cart }, console.log('cart in artcart', this.state.cart))
//   }

//   onRemoveItem = async (itemId) => {
//     let { cart } = this.state
//     cart = await wishlistService.remove(itemId)
//     this.setState({ cart })
//   }

//   onAddAllToBag = async () => {
//     console.log(this.state.cart); 
//     await cartService.addMany(this.state.cart)
//   //  history.push("/cart");
//    this.setState({ shoppingBag: true })
//   }

//   render() {
//     const { cart } = this.state;
//     return (
//       <section className="shoppingCart flex column">

//         <h1 className="cart-title">Wishlist</h1>
//         {
//           <div className="cart-list">
//             <Table>
//               <TableHead className="list-head">
//                 <TableRow>
//                   <TableCell colSpan="2">Artwork</TableCell>
//                   <TableCell>Price</TableCell>
//                   <TableCell>Remove</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {cart.map((item, idx) => (
//                   <TableRow key={`a${idx}`}>
//                     <TableCell>
//                       <img src={item.imgUrl} alt={item.title} className="cart-item-img" />
//                     </TableCell>
//                     <TableCell className="item-details">
//                       <p className="flex column">
//                       <span className="item-title">{item.title}</span>
//                       <span className="item-style">{`By ${item.artist.fullname}`}</span>
//                       <span>Size: {item.size.width}X{item.size.height}</span>
//                       </p>
//                     </TableCell>
//                     <TableCell>${item.price} </TableCell>
//                     <TableCell>
//                     <IconButton edge="end" aria-label="delete">
//                     <DeleteIcon onClick={() => this.onRemoveItem(item._id)} /> 
//                     </IconButton>
//                     </TableCell>
                    
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         }
//         {/* <div>
//             <EmptyState className="empty-state" txt="Your bag is currently empty" />
//         </div> */}

//         <div className="cart-actions">
//           <div className="btn flex">
//             <button><Link to={`/art`}>Continue shopping</Link></button>
//             {/* <CheckoutModal  onCheckOut={this.onCheckOut}/> */}
//              <button onClick={this.onAddAllToBag}>
//              Add All To Bag
//              </button>

             
//              {this.state.shoppingBag === true && 
//           <Link  to={`/cart`} ></Link>} 
             
            

            
//           </div>
//         </div>
//       </section>
//     );
//   }
// }

// function mapStateToProps({ userModule }) {
//   return {
//     user: userModule.loggedInUser,
//     users: userModule.users
//   };
// }

// const mapDispatchToProps = {
//     removeWishItem
// };

// export const WishList = connect(mapStateToProps, mapDispatchToProps)(_WishList);
