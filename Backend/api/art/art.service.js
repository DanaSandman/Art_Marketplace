const dbService = require('../../service/db.service.js')
const ObjectId = require('mongodb').ObjectId
const regexp = require('regexp')
const util = require('../../service/util.js')
// const asyncLocalStorage = require('../../services/als.service')
//JSON
// const artsData = require('../../data/art.json')

//LIST
async function query(filterBy = {}) {
    // if(filterBy !== {}){}
    // if(filterBy._id || filterBy.artistId || filterBy.search || filterBy.artCategory){
    console.log('!===');
    criteria = _buildCriteria(filterBy)
    // }
    try {
        const collection = await dbService.getCollection('art')
        console.log('23.criteria', criteria);
        const arts = await collection.find(criteria).toArray()
        return arts
    } catch (err) {
        // logger.error('cannot find toys', err)
        console.log('cannot find arts', err);
        throw err
    }
}
//DELETE
async function remove(artId) {
    console.log('artId', artId);
    try {
        const collection = await dbService.getCollection('art')
        // const store = asyncLocalStorage.getStore()
        // const { userId, isAdmin } = store
        // const collection = await dbService.getCollection('toy')
        // remove only if user is owner/admin
        // const criteria = { _id: ObjectId(artId) }
        const criteria = {
            _id: artId
        }

        // if (!isAdmin) query.byUserId = ObjectId(artId)
        await collection.deleteOne(criteria)
        console.log(`remove art ${artId}`)
        // return await collection.deleteOne({ _id: ObjectId(artId), byUserId: ObjectId(userId) })
    } catch (err) {
        console.log(`cannot remove art ${artId}`, err)
        throw err
    }
}
//ADD/EDIT
async function save(art) {
    console.log('service server art to edit or add', art);

    try {
        if (art._id) {
            console.log('service server art to edit or add idd', art._id);
            const artToSave = {
                _id: art._id,
                title: art.title,
                description: art.description,
                category: art.category,
                material: art.material,
                technique: art.technique,
                style: art.style,
                color: art.color,
                size: art.size,
                price: art.price,
                imgUrl: art.imgUrl,
            }
            const collection = await dbService.getCollection('art')
            await collection.updateOne({
                '_id': artToSave._id
            }, {
                $set: artToSave
            })
            const arts = await query();
            return arts;
        }
        console.log('service adddddddd');
        const artToAdd = art
        artToAdd._id = util.makeId();
        const collection = await dbService.getCollection('art')
        await collection.insertOne(artToAdd)
        const arts = await query();
        return arts;
    } catch (err) {
        // logger.error('cannot insert art', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    console.log('72.filterBy', filterBy);
    const criteria = {}

    const _id = (filterBy._id) ? filterBy._id : ''
    const artistId = (filterBy.artistId) ? filterBy.artistId : ''
    const search = {
        $regex: filterBy.search,
        $options: 'i'
    }
    const artCategory = (filterBy.artCategory) ? filterBy.artCategory : ''
    // const category =  {$regex: filterBy.category, $options: 'i' }
    if (filterBy.artistId || filterBy._id) {
        criteria.$or = [{
                _id: _id
            },
            {
                "artist._id": artistId
            },
        ]
    }
    if (filterBy.search) {
        criteria.$or = [{
                title: search
            },
            {
                "artist.fullname": search
            },
        ]
    }
    if (filterBy.artCategory) {
        console.log('artCategory', artCategory);
        criteria.$or = [{
            category: artCategory
        }, ]
    }
    console.log('criteriaaaaaa', criteria);
    return criteria
}

module.exports = {
    query,
    remove,
    save
}