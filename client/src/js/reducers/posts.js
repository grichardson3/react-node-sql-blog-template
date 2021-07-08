// Posts Reducer

const postsReducerDefaultState = [];

export default (state = postsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [
        ...state,
        action.post
      ]
    case 'REMOVE_POST':
      return state.filter(({ post_id }) => post_id !== action.post_id);
    case 'EDIT_POST':
      return state.map((post) => {
        if (post.post_id === action.post_id) {
          return {
            ...post,
            ...action.data
          }
        } else {
          return post;
        }
      })
    case 'EDIT_POST_USERNAME':
      return state.map((post) => {
        if (post.post_id === action.post_id) {
          return {
            ...post,
            ...action.dataTwo
          }
        } else {
          return post;
        }
      })
    default:
      return state;
  }
}