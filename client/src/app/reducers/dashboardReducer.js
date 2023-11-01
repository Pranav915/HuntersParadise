import { dashboardActions } from "app/actions/dashboardActions";

const initState = {
  totalBalance: null,
  freezedBalance: null,
  liveUserCount: null,
  totalLiveDealsCount: null,
  categoryLiveDealsCount: null,
  liveAuctionsCount: null,
  totalAuctionParticipantsCount: null,
  pieChartData: null,
  barChartData: null,
  allAuctions: null,
  allDeals: null,
  userAuctions: null,
  userDeals: null,
};

const dashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case dashboardActions.SET_TOTAL_BALANCE:
      return {
        ...state,
        totalBalance: action.totalBalance,
      };
    case dashboardActions.SET_FREEZED_BALANCE:
      return {
        ...state,
        freezedBalance: action.freezedBalance,
      };
    case dashboardActions.SET_LIVE_USER_COUNT:
      return {
        ...state,
        liveUserCount: action.liveUserCount,
      };
    case dashboardActions.SET_TOTAL_LIVE_DEALS_COUNT:
      return {
        ...state,
        totalLiveDealsCount: action.totalLiveDealsCount,
      };
    case dashboardActions.SET_CATEGORY_LIVE_DEALS_COUNT:
      return {
        ...state,
        categoryLiveDealsCount: action.categoryLiveDealsCount,
      };
    case dashboardActions.SET_LIVE_AUCTIONS_COUNT:
      return {
        ...state,
        liveAuctionsCount: action.liveAuctionsCount,
      };
    case dashboardActions.SET_TOTAL_AUCTION_PARTICIPANTS_COUNT:
      return {
        ...state,
        totalAuctionParticipantsCount: action.totalAuctionParticipantsCount,
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
