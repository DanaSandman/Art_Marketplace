// זו שכבה שרק מחברת חוטים בין ראוט מסויים יואראל לפונקצייה
const express = require('express')
//מידלוור שבודק אם היוזר מחובר או אדמין ניתן לשים את זה באמצע של כל ראוט 
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
//מידלוור לצורכי דיבאג
// const {log} = require('../../middlewares/logger.middleware')
const { getArts , getArt , deleteArt, saveArt } = require('./art.controller')

const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth) מידלוור של אוטנטיקציה האם היוזר מחובר למשל

router.get('/', getArts)//LIST
router.get('/:id', getArt)//DETAILS
// router.post('/',  requireAuth, addArt)
router.post('/',saveArt)
router.put('/',saveArt)
router.delete('/:id',deleteArt)//REMOVE/DELETE
// router.delete('/:id', requireAuth, deleteArt)

module.exports = router
