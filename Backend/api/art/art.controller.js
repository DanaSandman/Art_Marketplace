// const logger = require('../../service/logger.service')
const userService = require('../user/user.service')
// const socketService = require('../../services/socket.service')
const artService = require('./art.service')

module.exports = {
    getArts,
    deleteArt,
    saveArt,
    getArt
}
//LIST
// async function getArts(req, res , next) {
    // next();
// } זה כשרוצים לשים מידלוור לפני הריספונס יכול להיות בדיקה אם יוזר מחובר אוטנטיקציה למשל
async function getArts(req, res) {
    const filterBy = {}
    const {_id, artistId, search, artCategory}  = req.query
        try {
        filterBy['_id'] = _id
        filterBy.artistId = artistId
        filterBy.search = search
        filterBy.artCategory = artCategory
        // const arts = await artService.query(filterBy)
        console.log(' 27.req.query controller-getArts', req.query);
        console.log('24.req.params controller-getArts', req.params );
        const arts = await artService.query(req.query)

        res.send(arts)
    } catch (err) {
        // logger.error('Cannot get arts', err)
        console.log('Cannot get arts', err);
        res.status(500).send({ err: 'Failed to get arts' })
    }
}
//DETAILS
async function getArt(req, res) {
    console.log('getArtttttttttttt');
    try {
        console.log('req.params.id controller-getArt',req.params.id);
        const arts = await artService.query({ _id: req.params.id})
        // console.log('art controller', arts);
        console.log('arttt details controller start',arts[0]);
        res.send(arts[0])
    } catch (err) {
        // logger.error('Cannot get arts', err)
        console.log('Cannot get arts', err);
        res.status(500).send({ err: 'Failed to get arts' })
    }
}
//REMOVE
async function deleteArt(req, res) {
    console.log('req.params.id', req.params.id);
    try {
        console.log('artcontroller',req.params.id);

        await artService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        // logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete art' })
    }
}
//ADD/UPDATE
async function saveArt(req, res) {
    console.log('savvvvvvvvvvvvve controller');
    try {
        // console.log('req.params.id controller-getArt',req.params.id)
        var art = req.body
        console.log('controlllerrr art to edit' , art);
        // art.byUserId = req.session._id
         var arts = await artService.save(art)
        
        // prepare the updated toy for sending out
        // art.byUser = await userService.getById(art.byUserId)
        // art.aboutUser = await userService.getById(art.aboutUserId)

        // console.log('CTRL SessionId:', req.sessionID);
        // socketService.broadcast({type: 'art-added', data: art})
        // socketService.emitToAll({type: 'user-updated', data: art.byUser, room: req.session.user._id})
        res.send(arts)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add art', err)
        res.status(500).send({ err: 'Failed to add art' })
    }
}

