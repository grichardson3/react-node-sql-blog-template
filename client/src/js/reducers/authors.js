// Posts Reducer

const authorsReducerDefaultState = [];

export default (state = authorsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_AUTHOR':
      return [
        ...state,
        action.author
      ];
    case 'REMOVE_AUTHOR':
      return state.filter(({ users_id }) => users_id !== action.users_id);
    case 'EDIT_AUTHOR':
      return state.map((user) => {
        if (user.users_id === action.users_id) {
          return {
            ...user,
            ...action.data
          };
        } else {
          return user;
        }
      });
    default:
      return state;
  }
};