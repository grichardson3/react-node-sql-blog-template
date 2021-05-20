import { createStore, combineReducers } from 'redux';
import postsReducer from '../reducers/posts';

export default () => {
    const store = createStore(
        combineReducers({
            posts: postsReducer
        })
    );
    return store;
}