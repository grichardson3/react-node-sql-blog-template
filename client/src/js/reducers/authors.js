// Posts Reducer

const authorsReducerDefaultState = [];

export default (state = authorsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_AUTHOR':
      return [
        ...state,
        action.author
      ];
    default:
      return state;
  }
};