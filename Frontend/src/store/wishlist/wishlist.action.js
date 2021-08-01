import { wishlistService } from '../../services/wishlist/wishlist.service.js'


//REMOVE/DELETE
export function removeWishItem(wishItemId) {
    return async () => {
        try {
            await wishlistService.remove(wishItemId);
        } catch (err) {
            console.log('ArtActions: err in removeArt', err);
        }
    };
}
export function saveWishItem(wishItem) {
    return async () => {
        try {
            console.log('saving to cart', wishItem)
            const wishItems = await wishlistService.add(wishItem);
            console.log('user\'s cart after update', wishItems);
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
