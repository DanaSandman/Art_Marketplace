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
  console.log('query',entityType);
  // let entities = [{"_id":"a130","title":"Lady","price":1200,"imgUrl":"//cdn.shopify.com/s/files/1/0941/7736/products/lady_16x16_Croped_720x@2x.jpg?v=1620277746","material":"wood","technique":"Digital art","category":"Print","style":"Limited Edition Print","color":"white","artist":{"_id":"u107","fullname":"Bella McGoldrick","imgUrl":"https://res.cloudinary.com/tappan/image/upload/v1621526740/collection%20thumbs/sevtusjp6vzs9zzrgxyj.jpg"},"reviews":[{"id":"madeId","txt":"a great place to dine..","rate":4,"author":{"_id":"u102","fullname":"user2"}}],"description":"Evoking a sensual nature in the relationships of her objects, the titles of these works by McGoldrick suggest to the viewer an age or an owner of the layered items, with a nod on the concept of forbidden fruit throughout. The playfulness of the items when combined together depict behaviours and personalities that want to be tasted and admired. The photorealistic nature of these drawings take up to 60 hours per piece.","size":{"height":35,"width":50}},{"_id":"a146","title":"The Marginal Complex","price":800,"imgUrl":"//cdn.shopify.com/s/files/1/0941/7736/products/The-Marginal-Complex_24x18_Crop-2_720x@2x.jpg?v=1620331412","material":"paper","technique":"Digital art","category":"Colorful","style":"Limited Edition Print","color":"white","artist":{"_id":"u108","fullname":"Eriko Tsogo","imgUrl":"https://cdn.shopify.com/s/files/1/0941/7736/files/ErikoTsogo-Profile.jpg?v=1597963157"},"reviews":[{"id":"madeId","txt":"a great place to dine..","rate":4,"author":{"_id":"u102","fullname":"user2"}}],"description":"For Tsogo, these drawings are the physical manifestations of emotional release. The 'Wrong Women, Myths from Sky' series chronicles the metaphysical pilgrimage of the marginal heroine as they travel through the kaleidoscopic labyrinth of time, space and nature. On this journey they must learn to navigate and overcome perpetual opposition and adversity, worldly obstacles exemplified through various conceptualized physical bodily trials, in order to find themselves. The artworks act as part biographical expose, addressing the universal struggles of the binary identity in transition - seeking to help transform the viewer through the power of empathy, inspiration, and empowerment.","size":{"height":50,"width":70}}]
  let entities = await JSON.parse(localStorage.getItem(entityType)) || [];
  console.log('entities',entities);
  return entities;
}
//DETAILS FIND ONE BY ID
async function get(entityType, entityId) {
  const entities = await query(entityType);
  return entities.find(entity => entity._id === entityId);
}
//ADD
async function post(entityType, newEntity) {
  // newEntity._id = utilService.makeId();
  console.log(newEntity,'newEntity');
  console.log('entityType',entityType);

  const entities = await query(entityType);
  console.log('entities',entities);
  await entities.unshift(newEntity);
  console.log('entities after unshift',entities);
  _save(entityType, entities);
  return entities;
}

async function postMany(entityType, newEntities) {
  // newEntity._id = utilService.makeId();

  const entities = await query(entityType);
  newEntities.forEach(item => {
     entities.unshift(item);
      })

  _save(entityType, entities);
  return entities;
}

//UPDATE
async function put(entityType, updatedEntity) {
  console.log('the art in storage service', updatedEntity);
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
  console.log('save entityType',entityType);
  console.log('save entities',entities);
  localStorage.setItem(entityType, JSON.stringify(entities));
}
