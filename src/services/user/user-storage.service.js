import { utilService } from "../utilService";
const gData = require('../../data/gallery.json');

export const storageService = {
  login,
  signup,
  updateUser,
  query,
  resetPassword
};

//READ LIST
async function query(entityType) {
  let entities = await JSON.parse(localStorage.getItem(entityType)) || [];
  if (!entities || !entities.length) {
    entities = gData[entityType];
    _save(entityType, entities);
  }

  return entities;
}
//LOGIN
async function login(credentials) {
  const users = await query('users');
  const { email, password } = credentials;
  if (users) {
    const user = users.find(user => user.email === email && user.password === password);
    _save('shoppingCart', []);
    return user || null;
  }
}
//SIGNUP/CREATE
async function signup(newUser) {
  newUser._id = utilService.makeId();
  const users = await query("users");
  users.push(newUser);
  _save("users", users);
  return { users, user: newUser };
}
//UPDATE
async function updateUser(updatedUser) {
  const users = await query('users');
  const idx = users.findIndex(user => updatedUser._id === user._id);
  users.splice(idx, 1, updatedUser);
  _save('users', users);
  _saveLocalUser(updatedUser);
  return users;
}
//RESET PASSWORD
async function resetPassword(email, password) {
  const users = await query('users');
  const idx = users.findIndex(user => user.email === email);
  users[idx].password = password;
  _save('users', users);
  return users;
}
//SAVE USER TO SESSIONSTORAGE
function _saveLocalUser(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
  return user;
}
//SAVE ENTITIES TO STORAGE
function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}