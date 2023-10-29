import { auctionActions } from "app/actions/auctionActions";
const initState = {
  liveAuctions: [],
  upcomingAuctions: [],
  myAuctions: [],
};

const auctionReducer = (state = initState, action) => {
  switch (action.type) {
    case auctionActions.SET_LIVE_AUCTIONS:
      return {
        ...state,
        liveAuctions: action.data,
      };
    case auctionActions.SET_UPCOMING_AUCTIONS:
      return {
        ...state,
        upcomingAuctions: action.data,
      };
    case auctionActions.SET_MY_AUCTIONS:
      return {
        ...state,
        myAuctions: action.data,
      };
    default:
      return state;
  }
};

export default auctionReducer;
