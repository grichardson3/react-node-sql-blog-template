// Posts Reducer

const postsReducerDefaultState = [];

export default (state = postsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [
        ...state,
        action.post
      ];
    default:
      return state;
  }
};