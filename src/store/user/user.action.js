import { userService } from '../../services/user/user.service.js';

export function loadUsers() {
    return async dispatch => {
        try {
            const users = await userService.query();
            dispatch({ type: 'SET_USERS', users });
            console.log('action loadUsers',users);
        } catch (err) {
            console.log('User Actions: err in loaded users', err);
        }
    };
}
export function loadLoggedInUser() {
    return async dispatch => {
        try {
            const user =  await JSON.parse(sessionStorage.getItem() || 'null');
            if (user) {
                dispatch({ type: 'SET_USER', user });
                console.log('load user', user._id);
            }
        } catch (err) {
            console.log('User Actions: err in loaded User', err);
        }
    };
}
//LOGIN
export function login(credentials) {
    return async dispatch => {
        try {
            const user = await userService.login(credentials);
            console.log('user in reducer', user);
            if (user) {
                sessionStorage.setItem("user", JSON.stringify(user));
                dispatch({ type: 'LOGIN', user });
            }
        } catch (err) {
            console.log('User Actions: err in login', err);
        }
    };
}
//LOGOUT
export function logout() {
    return dispatch => {
        try {
            sessionStorage.clear()
            dispatch({ type: 'LOGOUT' });
        } catch (err) {
            console.log('User Actions: err in logout', err);
        }
    };
}
//SIGNUP
export function signup(userInfo) {
    return async dispatch => {
        try {
            const data = await userService.signup(userInfo);
            const { user, users } = data;
            if (data) {
                console.log('new user',data);
                sessionStorage.setItem("user", JSON.stringify(user));
                dispatch({ type: 'SIGNUP', user, users });
            }
        } catch (err) {
            console.log('User Actions: err in signUp', err);
        }
    };
}
//UPDATE
export function updateUser(user) {
    return async dispatch => {
        try {
            const users = await userService.updateUser(user);
            if (users) {
                dispatch({ type: 'UPDATE_USER', users, user });
                console.log('user',user);
            }
        } catch (err) {
            console.log('User Actions: err in updating a user', err);
        }
    };
}
//RESET PASSWORD
export function resetPassword(email, password) {
    return async dispatch => {
        try {
            const users = await userService.resetPassword(email, password);
            if (users) {
                dispatch({ type: 'RESET_PASSWORD', users });
            }
        } catch (err) {
            console.log('User Actions: err in resetting user password', err);
        }
    };
}

