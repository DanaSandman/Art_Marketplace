import {
  utilService
} from "../utilService";
const gData = require('../../data/gallery.json');

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  // loadArtsWithArtists
};

// //LOAD ARTS WITH ARTISTS
// async function loadArtsWithArtists(arts) {
//   const users = await query('users');
//   const artsWithArtists = arts.map(art => {
//     const artist = users.find(user => user._id === art.artist._id);
//     art.artist = artist;
//     return art;
//   });
//   return artsWithArtists;
// }

//READ LIST
async function query(entityType, filterBy) {
  let entities = await JSON.parse(localStorage.getItem(entityType)) || [];
  if (!entities || !entities.length) {
    entities = gData[entityType];
    console.log('entities', entities);
    _save(entityType, entities);
  }

  //לסדר הכל לסוויצ
  console.log('filterBy', filterBy);

  //לטפל
  if (filterBy.artistId) {
    console.log('filterBy.artistId');
    entities = entities.filter(art => (art.artist._id === filterBy.artistId));
    console.log('filterBy.artistId', filterBy.artistId);
  }

  //לטפל
  if (filterBy.search) {
    //  const search = {$regex: filterBy.search, $options: 'i' } 
    const search = filterBy.search
    entities = entities.filter(art => (art.title.includes(search) || art.artist.fullname.includes(search)));
    console.log('filterBy.search', search);
  }

  if (filterBy.artCategory) {
    entities = entities.filter(art => (art.category === filterBy.artCategory));
    console.log('filterBy.artCategory', filterBy.artCategory);
  }

  console.log('entities', entities);
  return entities;
}
//DETAILS FIND ONE BY ID
async function get(entityType, entityId) {
  const entities = await query(entityType);
  return entities.find(entity => entity._id === entityId);
}
//ADD
async function post(entityType, newEntity) {
  newEntity._id = utilService.makeId();
  const entities = await query(entityType);
  entities.push(newEntity);
  _save(entityType, entities);
  return entities;
}
//UPDATE
async function put(entityType, updatedEntity) {
  const entities = await query(entityType);
  const idx = entities.findIndex(entity => entity._id === updatedEntity._id);
  entities.splice(idx, 1, updatedEntity);
  _save(entityType, entities);
  return entities;
}
//DELETE
async function remove(entityType, entityId) {
  const entities = await query(entityType);
  const idx = entities.findIndex(entity => entity._id === entityId);
  entities.splice(idx, 1);
  _save(entityType, entities);
}
//SAVE TO STORAGE
function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}