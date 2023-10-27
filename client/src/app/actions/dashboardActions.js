import { apiCall } from "api";
import { ENDPOINTS } from "constants/AppConstants";
import { openAlertMessage } from "./alertActions";

export const dashboardActions = {
  SET_LIVE_USER_COUNT: "DASHBOARD.SET_LIVE_USER_COUNT",
  SET_TOTAL_BALANCE: "DASHBOARD.SET_TOTAL_BALANCE",
  SET_PIE_CHART_DATA: "DASHBOARD.SET_PIE_CHART_DATA",
  SET_FREEZED_BALANCE: "DASHBOARD.SET_FREEZED_BALANCE",
  SET_TOTAL_LIVE_DEALS_COUNT: "DASHBOARD.SET_TOTAL_LIVE_DEALS_COUNT",
  SET_CATEGORY_LIVE_DEALS_COUNT: "DASHBOARD.SET_CATEGORY_LIVE_DEALS_COUNT",
  SET_LIVE_AUCTIONS_COUNT: "DASHBOARD.SET_LIVE_AUCTIONS_COUNT",
  SET_TOTAL_AUCTION_PARTICIPANTS_COUNT: "DASHBOARD.SET_TOTAL_AUCTION_PARTICIPANTS_COUNT",
};

export const setTotalBalance = (totalBalance) => {
  return {
    type: dashboardActions.SET_TOTAL_BALANCE,
    totalBalance,
  };
};

export const setFreezedBalance = (freezedBalance) => {
  return {
    type: dashboardActions.SET_FREEZED_BALANCE,
    freezedBalance,
  };
};

export const setLiveUserCount = (liveUserCount) => {
  return {
    type: dashboardActions.SET_LIVE_USER_COUNT,
    liveUserCount,
  };
};

export const setTotalLiveDealsCount = (totalLiveDealsCount) => {
  return {
    type: dashboardActions.SET_TOTAL_LIVE_DEALS_COUNT,
    totalLiveDealsCount,
  };
};

export const setCategoryLiveDealsCount = (categoryLiveDealsCount) => {
  return {
    type: dashboardActions.SET_CATEGORY_LIVE_DEALS_COUNT,
    categoryLiveDealsCount,
  };
};

export const setLiveAuctionsCount = (liveAuctionsCount) => {
  return {
    type: dashboardActions.SET_LIVE_AUCTIONS_COUNT,
    liveAuctionsCount,
  };
};

export const setTotalAuctionParticipantsCount = (totalAuctionParticipantsCount) => {
  return {
    type: dashboardActions.SET_TOTAL_AUCTION_PARTICIPANTS_COUNT,
    totalAuctionParticipantsCount,
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
    setTotalBalance: (totalBalance) => dispatch(setTotalBalance(totalBalance)),
    setFreezedBalance: (freezedBalance) => dispatch(setFreezedBalance(freezedBalance)),
    setLiveUserCount: (liveUserCount) => dispatch(setLiveUserCount(liveUserCount)),
    setTotalLiveDealsCount: (totalLiveDealsCount) =>
      dispatch(setTotalLiveDealsCount(totalLiveDealsCount)),
    setCategoryLiveDealsCount: (categoryLiveDealsCount) =>
      dispatch(setCategoryLiveDealsCount(categoryLiveDealsCount)),
    setLiveAuctionsCount: (liveAuctionsCount) => dispatch(setLiveAuctionsCount(liveAuctionsCount)),
    setTotalAuctionParticipantsCount: (totalAuctionParticipantsCount) =>
      dispatch(setTotalAuctionParticipantsCount(totalAuctionParticipantsCount)),
    getLiveData: () => dispatch(getLiveData()),
    setPieChartData: (pieChartData) => dispatch(setPieChartData(pieChartData)),
    getDashboardDetails: () => dispatch(getDashboardDetails()),
    getPieChartData: () => dispatch(getPieChartData()),
  };
};

export const getLiveData = () => {
  return async (dispatch) => {
    const response = await apiCall({}, ENDPOINTS.GET_LIVE_DATA, "GET");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("dashboardDetails", response.data);
      dispatch(setLiveAuctionsCount(response?.data?.liveAuctions));
      dispatch(setTotalLiveDealsCount(response?.data?.liveDeals));
    }
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
