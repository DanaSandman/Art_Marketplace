import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { artReducer } from './art/art.reducer.js';
import { userReducer } from './user/user.reducer.js';
import { cartReducer } from './cart/cart.reducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  artModule: artReducer,
  userModule: userReducer,
  cartModule: cartReducer
});

export const store = createStore(rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
