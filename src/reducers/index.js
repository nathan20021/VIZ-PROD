import toolBarReducer from "./toolBarReducer";
import { combineReducers } from "redux";
import ComponentReducer from "./componentReducer";
import HeaderReducer from "./HeaderReducer";

const allReducers = combineReducers({
  toolBarState: toolBarReducer,
  currentTextNodeId: ComponentReducer,
  headerTitle: HeaderReducer,
});

export default allReducers;
