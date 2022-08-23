const HeaderReducer = (state = "My AWS Diagram", action) => {
  switch (action.type) {
    case "SET_Header":
      if (action.payload.length < 32) return action.payload;
      else {
        return state;
      }
    default:
      return state;
  }
};

export default HeaderReducer;
