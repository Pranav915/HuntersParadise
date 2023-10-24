import { dashboardActions } from "app/actions/dashboardActions";

const initState = {
  totalBalance: null,
  liveUsersCount: null,
  liveDealsCount: null,
  liveAuctions: null,
  pieChartData: null,
  barChartData: null,
  allAuctions: null,
  allDeals: null,
  userAuctions: null,
  userDeals: null,
};

const dashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case authActions.SET_LIVE_USER_COUNT:
      return {
        ...state,
        liveUserCount: action.liveUserCount,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
