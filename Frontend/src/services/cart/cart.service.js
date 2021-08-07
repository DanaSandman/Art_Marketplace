import {
    storageService
} from './cart-storage.service.js';

const STORAGE_KEY = 'shoppingCart';

export const cartService = {
    query,
    remove,
    add,
};

async function query() {
    console.log('fffff');
    const data = await storageService.query(STORAGE_KEY);
    console.log(data);
    return data
}
async function remove(itemId) {
    console.log('remove service - ', itemId);
    const cart = await storageService.remove(STORAGE_KEY, itemId)
    return cart
}
async function add(item) {
    // console.log('item', item);
    if(item._id){
        console.log('item', item);
        const cart = await storageService.post(STORAGE_KEY, item)
        return cart
    }
}