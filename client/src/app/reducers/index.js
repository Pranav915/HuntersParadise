import alertReducer from "./alertReducer";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import mainReducer from "./mainReducer";
import dealReducer from "./dealReducer";

const allReducers = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  main: mainReducer,
  deal: dealReducer,
});

export default allReducers;
