import toolBarReducer from "./toolBarReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  toolBarState: toolBarReducer,
});

export default allReducers;
