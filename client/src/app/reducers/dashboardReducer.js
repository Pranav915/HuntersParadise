import { dashboardActions } from "app/actions/dashboardActions";

const initState = {
  totalBalance: null,
  liveUsersCount: null,
  liveDealsCount: null,
  liveAuctions: null,
  pieChartData: [],
  barChartData: null,
  allAuctions: null,
  allDeals: null,
  userAuctions: null,
  userDeals: null,
};

const dashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case dashboardActions.SET_LIVE_USER_COUNT:
      return {
        ...state,
        liveUserCount: action.liveUserCount,
      };
    case dashboardActions.SET_TOTAL_BALANCE:
      return {
        ...state,
        totalBalance: action.totalBalance,
      };
    case dashboardActions.SET_PIE_CHART_DATA:
      return {
        ...state,
        pieChartData: action.pieChartData,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
