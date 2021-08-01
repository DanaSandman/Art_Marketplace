import { artService } from '../../services/art/art.service.js';

//LIST
export function loadArts(filterBy) {
    console.log('action filterBy',filterBy);
    return async dispatch => {
        console.log('????????');
        try {
            console.log('action filterBy',filterBy);
            const arts = await artService.loadArts(filterBy);
             console.log(arts);
            dispatch({ type: 'SET_ARTS', arts });
        } catch (err) {
            console.log('Art Actions: err in loaded Arts', err);
        }
    };
}
//REMOVE
export function removeArt(artId) {
    return async dispatch => {
        try {
            await artService.remove(artId);
            dispatch({ type: 'REMOVE_ART', artId });
        } catch (err) {
            console.log('ArtActions: err in removeArt', err);
        }
    };
}
//CREATE/UPDATE
export function saveArt(art) {
    return async dispatch => {
        try {
            const arts = await artService.save(art);
            console.log('arts after update', arts);
            const action = {
                type: 'SET_ARTS',
                arts: arts
            };
            dispatch(action);
        } catch (err) {
            console.log('ArtActions: err in saveArt', err);
        }

    };
}
//DETAILS
export function setArt(artId) {
    return async dispatch => {
        try {
            console.log('action artId', artId);
            const art = await artService.getById(artId);
            console.log('action art res', art);
            dispatch({ type: 'SET_ART', art });
        } catch (err) {
            console.log('Art Actions: err in selected Art', err);
        }
    };
}
//FILTER
export function filterArt(filterBy) {
    console.log('filterBy', filterBy);
    return async dispatch => {
      try {
        const arts = await artService.loadArts(filterBy)
        console.log('action arts', arts );
        dispatch({ type: 'SET_ARTS', arts })
      } catch (err) {
        console.log('ArtActions: err in loadArts', err)
      } 
    }
}