const toolBarReducer = (state, action) => {
  switch (action.type) {
    case "SWITCH_TEXT_TOOL":
      return { ...state, textTool: !state.textTool };
    case "SET_FONT":
      return { ...state, fontSize: action.payload };
    case "INCREASE_FONT":
      return { ...state, fontSize: state.fontSize + 1 };
    case "DECREASE_FONT":
      return { ...state, fontSize: state.fontSize - 1 };
    default:
      return { textTool: false, fontSize: 14 };
  }
};

export default toolBarReducer;
