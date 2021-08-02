const userService = require('./user.service')
// const socketService = require('../../services/socket.service')
// const logger = require('../../services/logger.service')

module.exports = {
    getUser,
    getUsers,
    login,
    signup,
    resetPassword,
    // deleteUser,
    updateUser
}
//LIST/QUERY
async function getUsers(req, res) {
    let filterBy = {}
    console.log(' get userscontroller filterBy1',filterBy);
    //זה האחרון שהוא מדפיס 
    // try {
    //     filterBy = req.query
    //     // const filterBy = {
    //         //     txt: req.query?.txt || '',
    //         //     minBalance: +req.query?.minBalance || 0
    //         // }
    //         //לא נכנס לסרויס בכלל למהה?????
    //         const users = await userService.query(req.query)
    //         console.log('controller users',users);
    //     res.send(users)
    // } catch (err) {
    //     // logger.error('Failed to get users', err)
    //     res.status(500).send({ err: 'Failed to get users' })
    // }
    filterBy = req.query
    if(!req.query.email){
    const users = await userService.query(req.query)
            res.send(users)}

}
//DETAILS/GET LOGGEDINUSER
async function getUser(req, res) {
    console.log('gett user1 conteoller');
    try {
        const user = await userService.getUser()
        res.send(user)
        // res.send(arts[0])
    } catch (err) {
        // logger.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}
async function updateUser(req, res) {
    try {
        const user = req.body
        const savedUser = await userService.save(user)
        res.send(savedUser)
        // socketService.broadcast({type: 'user-updated', data: toy, to:savedUser._id})
    } catch (err) {
        // logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

//AUTH
async function login(req, res){
    console.log('login controller1');
    const credentials = {}
    const { email , password } = req.query
    try {
        credentials.email = email
        credentials.password = password
        console.log('credentials.password',credentials.password );
        console.log('11111.controller2 req.query',req.query);
        const user = await userService.login(req.query)

        res.send(user)
        // res.send(arts[0])
    } catch (err) {
        // logger.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}
async function signup(req, res) {
    console.log('controller signuppppppp');
    console.log('req.body',req.body);
    try {
     // user.byUserId = req.session.user._id
       const user = await userService.save(req.body)       
        // prepare the updated toy for sending out
        // toy.byUser = await userService.getById(toy.byUserId)
        // toy.aboutUser = await userService.getById(toy.aboutUserId)

        // console.log('CTRL SessionId:', req.sessionID);
        // socketService.broadcast({type: 'toy-added', data: toy})
        // socketService.emitToAll({type: 'user-updated', data: toy.byUser, room: req.session.user._id})
        res.send(user)
    } catch (err) {
        console.log(err)
        // logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add user' })
    }
}
async function resetPassword(req, res) {
    console.log('controller reseetttt');
    const credentials = {}
    // const { email , password } = req.query
    try {
        credentials.email = req.query.email
        credentials.password = req.query.password

        console.log('credentials.password',credentials.password );
        console.log('11111.controller2 req.query',req.query);

        const users = await userService.resetPassword(req.query)

        res.send(users)
        // res.send(arts[0])
    } catch (err) {
        // logger.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}
