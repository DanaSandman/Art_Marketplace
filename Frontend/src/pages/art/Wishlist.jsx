import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { wishlistService } from '../../services/wishlist/wishlist.service.js'
import { removeWishItem } from '../../store/wishlist/wishlist.action.js'
import {
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
} from '@material-ui/core';
import { EmptyState } from '../../cmps/util/EmptyState.jsx';
import { updateUser } from '../../store/user/user.action.js';

class _Wishlist extends React.Component {

    state = {
        wishlist: [],
    }

    async componentDidMount() {
        const wishlist = await wishlistService.query()
        this.setState({ wishlist })
    }

    onRemoveItem = async (itemId) => {
        let { wishlist } = this.state
        wishlist = await wishlistService.remove(itemId)
        this.setState({ wishlist })
    }

    /*handleChange = ({ target }) => {
      const value = target.value
      const field = target.name
      this.setState({ note: value })
    }*/


    render() {
        const { wishlist } = this.state;
        const { user } = this.props;

        return (
            <section className="wishlist-container">

                <h1 className="list-title">Wish List</h1>

                {user ? (
                    <div className="wish-list">

                        <Table>
                            <TableHead className="list-head">
                                <TableRow>
                                    <TableCell colSpan="2">Product</TableCell>
                                    <TableCell>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {wishlist.map((item, idx) => (
                                    <TableRow key={`a${idx}`}>
                                        <TableCell>
                                            <img src={item.imgUrl} alt={item.title} className="cart-item-img" />
                                        </TableCell>
                                        <TableCell className="item-details">
                                            <span className="item-title">
                                                {item.title}
                                            </span>
                                            <span className="item-price">{item.price}</span>
                                            <span>{item.artist.fullname}</span>
                                            <span>Size: {item.size.width}X{item.size.height}</span>
                                            <button onClick={() => this.onRemoveItem(item._id)} className="remove-btn"> Remove </button>
                                        </TableCell>
                                        <TableCell>${item.price} </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <EmptyState className="empty-state" txt="Your bag is currently empty" />
                )}


                <div className="wishlist-btn">
                    <button><Link to={`/art`}> Continue shopping</Link></button>
                </div>
            </section>
        );

    }
}


function mapStateToProps({ userModule }) {
    return {
        user: userModule.loggedInUser,
        users: userModule.users
    };
}

const mapDispatchToProps = {
    removeWishItem,
    updateUser
};

export const Wishlist = connect(mapStateToProps, mapDispatchToProps)(_Wishlist);

