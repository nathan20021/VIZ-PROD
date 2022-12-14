import toolBarReducer from "./toolBarReducer";
import { combineReducers } from "redux";
import ComponentReducer from "./componentReducer";
import HeaderReducer from "./HeaderReducer";
import deleteNodeReducer from "./nodeDeleteReducer";
import SideBarReducer from "./SideBarReducer";
import userControlReducer from "./userControlReducer";

const allReducers = combineReducers({
  toolBarState: toolBarReducer,
  currentTextNodeId: ComponentReducer,
  headerTitle: HeaderReducer,
  deleteNodeRequest: deleteNodeReducer,
  sideBarState: SideBarReducer,
  userControlState: userControlReducer
});

export default allReducers;
