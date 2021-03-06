const dbService = require('../../service/db.service.js')
const logger = require('../../service/logger.service')
const util = require('../../service/util.js')
// const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getUser,
    login,
    resetPassword,
    save
    // getByUsername,
    // remove,
}
//AUTH
async function login(credentials){
    const users = await query()
    if (users) {
    console.log('users have');
    const user = findUser(users,credentials)
    console.log('user log',user);
    return user
    }
// _save('shoppingCart', []);
    return  JSON.stringify(user) || null;
}
async function resetPassword(credentials){
    const users = await query()  
    if (users){
        const idx = users.findIndex(user => user.email === credentials.email);
        const collection = await dbService.getCollection('user')
        collection.update({"_id":`${users[idx]._id}`}, {$set:{password:`${credentials.password}`}})
        users[idx].password = credentials.password;
        return users;
    }
}
//USER
async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find(criteria).toArray()
        // users = users.map(user => {
        //     delete user.password
        //     // Returning fake fresh data
        //     return user
        // })
        //לא עובד כרגע עם המחיקה של הסיסמה 
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}
async function getUser(entityType){
    console.log(' server service getUser entityType',entityType);
    return await JSON.parse(sessionStorage.getItem(entityType) || 'null');
}
async function save(user){
if(user._id){
    const userToSave = {
        // _id: ObjectId(user._id),
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        iaAdmin: user.iaAdmin,
        isArtist: user.isArtist,
        specializes: user.specializes,
        info: user.info,
        imgUrl: user.imgUrl,
        imgHero: user.imgHero,
        decription: user.decription,
        orders: user.orders,
        username: user.username,
    }
    const collection = await dbService.getCollection('user')
    await collection.updateOne({ '_id': userToSave._id }, { $set: userToSave })
    return userToSave;
} try{
        const userToAdd = user;
        userToAdd._id = util.makeId()
        userToAdd.imgHero = '//cdn.shopify.com/s/files/1/0941/7736/collections/61eafd5324e8ce97a03737646603742d_1728x.jpg?v=1620253953'
        userToAdd.description = 'is a visual artist based in London, UK. Playfully addressing scale, form and color, his pieces are both ambiguous and approachable. Inspired by geometric abstraction of the 1980s, Wall’s work exists to mirror contemporary society through conformity, preconceptions and individualism. Through themes of familiarity and hierarchy, his practice explores the everyday commonalities that connect us all, most recently the relationships we hold with society’s most ubiquitous materials'
        const collection = await dbService.getCollection('user')
        await collection.insertOne(user)
        const users = await query();
        return { users, user: user };
} catch (err) {
            logger.error('cannot insert user', err)
            throw err
    }
}
function _buildCriteria(filterBy){
    const criteria = {}
    return criteria
}
async function findUser(users,credentials){
    const { email, password } = credentials;
    const user = await users.find(user => user.email === email && user.password === password);
    return user
}





