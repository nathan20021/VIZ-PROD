import toolBarReducer from "./toolBarReducer";
import { combineReducers } from "redux";
import ComponentReducer from "./componentReducer";
import HeaderReducer from "./HeaderReducer";
import deleteNodeReducer from "./nodeDeleteReducer";

const allReducers = combineReducers({
  toolBarState: toolBarReducer,
  currentTextNodeId: ComponentReducer,
  headerTitle: HeaderReducer,
  deleteNodeRequest: deleteNodeReducer,
});

export default allReducers;
