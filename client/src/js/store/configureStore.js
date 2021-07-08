import { createStore, combineReducers } from 'redux';
import postsReducer from '../reducers/posts';
import authorsReducer from '../reducers/authors';
import themeReducer from '../reducers/theme';

export default () => {
    const store = createStore(
        combineReducers({
            posts: postsReducer,
            users: authorsReducer,
            theme: themeReducer
        })
    );
    return store;
}