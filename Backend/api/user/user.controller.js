const userService = require('./user.service')
// const socketService = require('../../services/socket.service')
const logger = require('../../service/logger.service')

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
    try {
        if(!req.query.email){
        const users = await userService.query(req.query)
        res.send(users)
        }
        res.send(users)
    } catch (err) {
        logger.error('Failed to get users', err)
        res.status(500).send({ err: 'Failed to get users' })
    }
}
//DETAILS/GET LOGGEDINUSER
async function getUser(req, res) {
    console.log('gett user1 conteoller');
    try {
        const user = await userService.getUser()
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
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
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

//AUTH
async function login(req, res){
    const credentials = {}
    const { email , password } = req.query
    try {
        credentials.email = email
        credentials.password = password
        const user = await userService.login(req.query)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}
async function signup(req, res) {
    try {
       const user = await userService.save(req.body)       
       logger.debug(`auth.route - new account created: ` + JSON.stringify(user))
        res.send(user)
    } catch (err) {
        console.log(err)
        logger.error('Failed to signup', err)
        res.status(500).send({ err: 'Failed to add user' })
    }
}
async function resetPassword(req, res) {
    const credentials = {}
    try {
        credentials.email = req.query.email
        credentials.password = req.query.password
        const users = await userService.resetPassword(req.query)
        res.send(users)
    } catch (err) {
        logger.error('Failed to reset pass', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}
