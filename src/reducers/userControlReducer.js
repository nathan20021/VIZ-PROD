const userControlReducer = (
  state = {
    currentKey: undefined,
  },
  action
) => {
  switch (action.type) {
    case "SET_CURRENT_KEY":
      return { ...state, currentKey: action.payload };
    default:
      return state;
  }
};

export default userControlReducer;
