import alertReducer from "./alertReducer";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import mainReducer from "./mainReducer";

const allReducers = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  main: mainReducer,
});

export default allReducers;
