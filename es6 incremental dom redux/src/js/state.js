//import {createStore} from './lib/state';
import { createStore } from 'redux';

let initialState = {
    repos: [],
    error: null,
    isLoading: false,
    username: ''
};

function appReducer(state, change) {
    state = state || initialState;
    switch(change.type) {
        case 'USERNAME_CHANGE':
            state = Object.assign({}, state, {
              username: change.username,
              isLoading: true,
              error: null,
              repos: []
            });
            break;
        case 'REPOS_LOADED':
            state = Object.assign({}, state, {
              isLoading: false,
              error: null,
              repos: change.repos
            });
            break;
        case 'ERROR':
            state = Object.assign({}, state, {
              isLoading: false,
              error: change.text
            });
    }
    return state;
}

export const appStore = createStore(appReducer);
