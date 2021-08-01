const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const { login, signup ,resetPassword } = require('../user/user.controller')
const router = express.Router()

router.get('/login', login)//LOGIN
router.post('/signup', signup) //ADD USER
// router.get('/logout', logout)//LOGIN
router.get('/reset', resetPassword)


module.exports = router