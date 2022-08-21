const ComponentReducer = (state, action) => {
  switch (action.type) {
    case "SET_DRAG_HANDLE":
      return action.payload;
    default:
      return null;
  }
};

export default ComponentReducer;
