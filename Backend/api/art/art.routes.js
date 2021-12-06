const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
// const {log} = require('../../middlewares/logger.middleware')
const { getArts , getArt , deleteArt, saveArt } = require('./art.controller')

const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth) 
console.log('routerrouterrouter');
router.get('/', getArts)//LIST
router.get('/:id', getArt)//DETAILS
// router.post('/',  requireAuth, addArt)
router.post('/',saveArt)//ADD
router.put('/',saveArt)//UPDATE
router.delete('/:id',deleteArt)//REMOVE/DELETE
// router.delete('/:id', requireAuth, deleteArt)

module.exports = router
