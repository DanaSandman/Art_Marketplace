import { storageService } from './wishlist-storage.service.js';

const STORAGE_KEY = 'wishlist';

export const wishlistService = {
    query,
    remove,
    add,
};

async function query() {
    return await storageService.query(STORAGE_KEY);
}
async function remove(itemId) {
   const wishlist = await storageService.remove(STORAGE_KEY, itemId)
   return wishlist
}
async function add(item) {
    if(item._id){
    const wishlist = await storageService.post(STORAGE_KEY, item)
    return wishlist
    }
}
