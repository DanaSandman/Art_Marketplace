import { httpService } from '../http.service.js';
import { storageService } from './art-storage.service.js';

const STORAGE_KEY = 'arts';

export const artService = {
    getById,
    save,
    remove,
    loadArts,
};
//LIST
async function loadArts(filterBy) {
 return await httpService.get('art/', filterBy);
//  return await storageService.query(STORAGE_KEY,filterBy );

// return await storageService.loadArtsWithArtists(arts); //  לא עובד לבדוק או למחוק לגמרי
}
//DETAILS
async function getById(artId) {
    console.log('front service art id', artId);
    // return await storageService.get(STORAGE_KEY, artId);
    return await httpService.get(`art/${artId}`);
}
//REMOVE
async function remove(artId) {
    // return await storageService.remove(STORAGE_KEY, artId);
    return httpService.delete(`art/${artId}`)
}
//CREATE/UPDATE
async function save(art) {
    if (art._id) {
        // return await storageService.put(STORAGE_KEY, art);
         return await httpService.put('art/', art)
    } else {
        // return await storageService.post(STORAGE_KEY, art);
        return httpService.post('art/', art)
    }
}
