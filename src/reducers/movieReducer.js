import { SEARCH_MOVIE, GET_MOVIE, HANDLE_FAV } from '../actions/types';

const initial_state = {
    movies: [],
    current_modal: {},
    fav_movies: []
}

export default function(state = initial_state, action) {
    switch (action.type) {
        case SEARCH_MOVIE:
            return {
                ...state,
                movies: action.payload
            }
        case GET_MOVIE:
            return {
                ...state,
                current_modal: action.payload
            }
        case HANDLE_FAV:
            return {
                ...state,
                movies: action.payload
            }
        default:
            return state
    }
}