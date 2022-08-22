const HeaderReducer = (state, action) => {
  switch (action.type) {
    case "SET_Header":
      if (action.payload.length < 30) return action.payload;
      else {
        return state;
      }
    default:
      return "My AWS Diagram";
  }
};

export default HeaderReducer;
