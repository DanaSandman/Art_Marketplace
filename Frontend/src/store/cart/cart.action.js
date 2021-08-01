import { cartService } from '../../services/cart/cart.service.js'
import { userService } from '../../services/user/user.service.js'

export function loadCartItems(user) {
    return async dispatch => {
        try {
            const cartItems = await userService.updateUser(user);
            dispatch({ type: 'SET_CART_ITEMS', cartItems });
            console.log('load arts', cartItems);
        } catch (err) {
            console.log('Art Actions: err in loaded Arts', err);
        }
    };
}
//REMOVE/DELETE
export function removeCartItem(cartItemId) {
    return async () => {
        try {
            await cartService.remove(cartItemId);
            //await cartService.remove(cartItemId);
            // dispatch({ type: 'REMOVE_CART_ITEM', cartItemId });
        } catch (err) {
            console.log('ArtActions: err in removeArt', err);
        }
    };
}
export function saveCartItem(cartItem) {
    return async () => {
        try {
            console.log('saving to cart', cartItem)
            const cartItems = await cartService.add(cartItem);
            console.log('user\'s cart after update', cartItems);
        } catch (err) {
            console.log('CartActions: err in saveCart', err);
        }

    };
}
/*export function setItem(itemId) {
    return async dispatch => {
        try {
            const item = await artService.getById(itemId);
            dispatch({ type: 'SET_ITEM', item });
        } catch (err) {
            console.log('Art Actions: err in selected Art', err);
        }
    };
}*/
