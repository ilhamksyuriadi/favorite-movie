import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initial_state = {};

const middle_ware = [thunk]

const store = createStore(
    rootReducer, 
    initial_state, 
    applyMiddleware(...middle_ware)
)

export default store