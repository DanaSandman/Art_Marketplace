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
    return await storageService.query(STORAGE_KEY);
}

async function remove(itemId) {
    console.log('remove service - ', itemId);
    const cart = await storageService.remove(STORAGE_KEY, itemId)
    return cart
}
async function add(item) {
    const cart = await storageService.post(STORAGE_KEY, item)
    return cart
}