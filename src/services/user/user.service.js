import { httpService } from '../http.service.js';
import { storageService } from './user-storage.service';

const STORAGE_KEY = 'users';

export const userService = {
    login,
    signup,
    query,
    updateUser,
    resetPassword,
    // remove,
};
//AUTH
//LOGIN
async function login(credentials) {
    try {
        // return await storageService.login(credentials);
        return await httpService.get('auth/login', credentials);
    } catch (err) {
        throw err;
    }
}
//SIGNUP/CREATE
async function signup(userInfo) {
    try {
        // return await storageService.signup(userInfo);        
        return httpService.post('auth/signup',userInfo)
    } catch (err) {
        throw err;
    }
}
//USER
//LIST
async function query() {
    // return await storageService.query(STORAGE_KEY);
    return await httpService.get('user/')
}
//UPDATE 
async function updateUser(user) {
    // return storageService.updateUser(user);
    return await httpService.put('user/', user)
}
//PASSEORD
async function resetPassword(email, password) {
    const data = {
        email,
        password
    }
    // return await storageService.resetPassword(email, password);
    return await httpService.get('auth/reset', data)
}




