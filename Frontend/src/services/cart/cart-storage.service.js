export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  postMany
};

//READ LIST
async function query(entityType) {
  let entities = await JSON.parse(localStorage.getItem(entityType)) || [];
  return entities;
}
//DETAILS FIND ONE BY ID
async function get(entityType, entityId) {
  const entities = await query(entityType);
  return entities.find(entity => entity._id === entityId);
}
//ADD
async function post(entityType, newEntity) {
  const entities = await query(entityType);
  await entities.unshift(newEntity);
  _save(entityType, entities);
  return entities;
}
//ADD FROM WISHLIST
async function postMany(entityType, newEntities) {
  const entities = await query(entityType);
  newEntities.forEach(item => {
     entities.unshift(item);
  })
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
  return entities;
}
//SAVE TO STORAGE
function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}
