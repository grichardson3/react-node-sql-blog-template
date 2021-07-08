// Theme Reducer

const themeReducerDefaultState = [];

export default (state = themeReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_THEME':
      return [
        ...state,
        action.theme
      ]
    case 'EDIT_THEME':
      return state.map((theme) => {
        return {
          ...theme,
          ...action.data
        }
      })
    default:
      return state;
  }
}