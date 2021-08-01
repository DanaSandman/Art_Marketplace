const initialState = {
    cartItems: [],
    //selectedArt: null,
};

export function cartReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_CART_ITEMS':
            return { ...state, cartItems: action.cartItems };
        /*case 'SET_ART':
            return { ...state, selectedArt: action.art };*/
        case 'ADD_CART_ITEM':
            return { ...state, cartItem: [...state.cartItems, action.cartItem] };
        case 'UPDATE_CART_ITEM`':
            return { ...state, cartItems: [...state.cartItems.filter(cartItem => action.cartItem._id !== cartItem._id), action.cartItem] };
        case 'REMOVE_CART_ITEM':
            return { ...state, cartItems: state.cartItems.filter(cartItem => cartItem._id !== action.cartItemId) };
        default:
            return state;
    }
}
