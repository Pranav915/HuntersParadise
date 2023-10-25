import { apiCall } from "api";
import { ENDPOINTS } from "constants/AppConstants";
import { openAlertMessage } from "./alertActions";

export const dashboardActions = {
  SET_LIVE_USER_COUNT: "DASHBOARD.SET_LIVE_USER_COUNT",
};

export const setLiveUserCount = (countType) => {
  return {
    type: dashboardActions.SET_LIVE_USER_COUNT,
    countType,
  };
};

export const getDashboardActions = (dispatch) => {
  return {
    getDashboardDetails: () => dispatch(getDashboardDetails()),
  };
};

export const getDashboardDetails = () => {
  return async (dispatch) => {
    const response = await apiCall({}, ENDPOINTS.GET_DASHBOARD_DETAILS, "GET");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      const { dashboardDetails } = response?.data;
      console.log("dashboardDetails", dashboardDetails);
    }
  };
};
