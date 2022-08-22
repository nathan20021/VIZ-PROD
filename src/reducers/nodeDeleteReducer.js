const deleteNodeReducer = (state = false, action) => {
  switch (action.type) {
    case "DELETE_NODE":
      return true;
    case "SET_DELETE_REQUEST":
      return action.payload;
    default:
      return false;
  }
};

export default deleteNodeReducer;
