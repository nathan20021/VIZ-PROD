const ComponentReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_CURRENT_NODE_ID":
      return action.payload;
    default:
      return state;
  }
};

export default ComponentReducer;
