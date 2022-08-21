import toolBarReducer from "./toolBarReducer";
import { combineReducers } from "redux";
import ComponentReducer from "./componentReducer";

const allReducers = combineReducers({
  toolBarState: toolBarReducer,
  draggingHandleId: ComponentReducer,
});

export default allReducers;
