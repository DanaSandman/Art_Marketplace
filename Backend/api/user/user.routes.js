const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const { getUser, getUsers ,updateUser } = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getUsers) //LIST/QUERY
router.get('/', getUser) //DETAILS/GET LOGGEDINUSER
router.put('/',  updateUser)
// router.put('/:id',  updateUser)

// router.put('/:id',  requireAuth, updateUser)
// router.delete('/:id',  requireAuth, requireAdmin, deleteUser)

module.exports = router