const toolBarReducer = (state = { textTool: false }, action) => {
  switch (action.type) {
    case "SWITCH_TEXT_TOOL":
      return { ...state, textTool: !state.textTool };
    default:
      return { textTool: false };
  }
};

export default toolBarReducer;
