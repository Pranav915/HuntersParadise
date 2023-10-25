import alertReducer from "./alertReducer";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import mainReducer from "./mainReducer";
import dealReducer from "./dealReducer";
import notificationReducer from "./notificationReducer";

const allReducers = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  main: mainReducer,
  deal: dealReducer,
  notification: notificationReducer,
});

export default allReducers;
