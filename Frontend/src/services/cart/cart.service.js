import { storageService } from "./cart-storage.service.js";

const STORAGE_KEY = "shoppingCart";

export const cartService = {
  query,
  remove,
  add,
  addMany,
};
//READ LIST
async function query() {
  const data = await storageService.query(STORAGE_KEY);
  return data;
}
//DELETE
async function remove(itemId) {
  console.log('remove',itemId);
  const cart = await storageService.remove(STORAGE_KEY, itemId);
  console.log('remove end',itemId);
  return cart;
}
//ADD
async function add(item) {
  if (item._id) {
    const cart = await storageService.post(STORAGE_KEY, item);
    return cart;
  }
}
//ADD FROM WISHLIST
async function addMany(items) {
  const cart = await storageService.postMany(STORAGE_KEY, items);
  return cart;
}
