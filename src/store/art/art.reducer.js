const initialState = {
    arts: [],
    selectedArt: null,
};

export function artReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_ARTS':
            return { ...state, arts: action.arts };
        case 'SET_ART':
            return { ...state, selectedArt: action.art };
        case 'ADD_ART':
            return { ...state, arts: [...state.arts, action.art] };
        case 'UPDATE_ART':
            return { ...state, arts: [...state.arts.filter(art => action.art._id !== art._id), action.art,] };
        case 'REMOVE_ART':
            return { ...state, arts: state.arts.filter(art => art._id !== action.artId) };
        default:
            return state;
    }
}
