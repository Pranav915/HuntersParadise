import alertReducer from "./alertReducer";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import mainReducer from "./mainReducer";
import dealReducer from "./dealReducer";
import notificationReducer from "./notificationReducer";
import dashboardReducer from "./dashboardReducer";
import auctionReducer from "./auctionReducer";
import walletReducer from "./walletReducer";

const allReducers = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  main: mainReducer,
  deal: dealReducer,
  auction: auctionReducer,
  dashboard: dashboardReducer,
  notification: notificationReducer,
  wallet: walletReducer,
});

export default allReducers;
