const toolBarReducer = (
  state = {
    textTool: false,
    fontSize: 11,
    bold: false,
    italic: false,
    underline: false,
    fontColor : {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    },
    bgColor: {
      r: 255,
      g: 255,
      b: 255,
      a: 1,
    }
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
      return { ...state, italic: action.payload };
    case "SET_UNDERLINE":
      return { ...state, underline: action.payload };
    case "SET_BG_COLOR":
      return { ...state, bgColor: action.payload };
    case "SET_FONT_COLOR":
      return { ...state, fontColor: action.payload };
    default:
      return state;
  }
};

export default toolBarReducer;
