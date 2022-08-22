const toolBarReducer = (
  state = {
    textTool: false,
    fontSize: 11,
    bold: false,
    italic: false,
    underline: false,
  },
  action
) => {
  switch (action.type) {
    case "SWITCH_TEXT_TOOL":
      return { ...state, textTool: !state.textTool };
    case "SET_FONT":
      return { ...state, fontSize: action.payload };
    case "INCREASE_FONT":
      return { ...state, fontSize: state.fontSize + 1 };
    case "DECREASE_FONT":
      return { ...state, fontSize: state.fontSize - 1 };
    case "SWITCH_BOLD":
      return { ...state, bold: !state.bold };
    case "SWITCH_ITALIC":
      return { ...state, italic: !state.italic };
    case "SWITCH_UNDERLINE":
      return { ...state, underline: !state.underline };
    case "SET_BOLD":
      return { ...state, bold: action.payload };
    case "SET_ITALIC":
      return { ...state, bold: action.payload };
    case "SET_UNDERLINE":
      return { ...state, bold: action.payload };
    default:
      return state;
  }
};

export default toolBarReducer;
