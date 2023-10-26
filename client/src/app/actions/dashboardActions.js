import { apiCall } from "api";
import { ENDPOINTS } from "constants/AppConstants";
import { openAlertMessage } from "./alertActions";

export const dashboardActions = {
  SET_LIVE_USER_COUNT: "DASHBOARD.SET_LIVE_USER_COUNT",
  SET_TOTAL_BALANCE: "DASHBOARD.SET_TOTAL_BALANCE",
  SET_PIE_CHART_DATA: "DASHBOARD.SET_PIE_CHART_DATA",
};

export const setTotalBalance = (totalBalance) => {
  return {
    type: dashboardActions.SET_TOTAL_BALANCE,
    totalBalance,
  };
};

export const setLiveUserCount = (count) => {
  return {
    type: dashboardActions.SET_LIVE_USER_COUNT,
    count,
  };
};

export const setPieChartData = (pieChartData) => {
  return {
    type: dashboardActions.SET_PIE_CHART_DATA,
    pieChartData,
  };
};

export const getDashboardActions = (dispatch) => {
  return {
    setLiveUserCount: (count) => dispatch(setLiveUserCount(count)),
    setTotalBalance: (totalBalance) => dispatch(setTotalBalance(totalBalance)),
    getDashboardDetails: () => dispatch(getDashboardDetails()),
    getPieChartData: () => dispatch(getPieChartData()),
    setPieChartData: (pieChartData) => dispatch(setPieChartData(pieChartData)),
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

export const getPieChartData = () => {
  return async (dispatch) => {
    const response = await apiCall({}, ENDPOINTS.GET_CATEGORY_DATA, "GET");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      const { dashboardDetails } = response?.data;
      console.log("pieChartDataResponse", response?.data);
      dispatch(setPieChartData(response?.data));
    }
  };
};
