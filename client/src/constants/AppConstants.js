export const BASE_URL = "http://localhost:5000/";
export const BASE_URL_DATAMIND = "http://localhost:5001";

export const ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  REQUEST_PASSWORD_RESET: "/auth/requestPasswordReset",
  PASSWORD_RESET: "/auth/passwordReset",
  ADD_INITIAL_DETAILS: "/main/addInitialDetails",
  CREATE_DEAL: "/deal/createDeal",
  GET_DASHBOARD_DETAILS: "",
  GET_ALL_DEALS: "/deal/getdeals?cat=all",
  GET_MY_DEALS: "/deal/getMyDeals",
  GET_MY_OFFERS: "/deal/getMyOffers",
  GET_CATEGORY_DATA: "/data/categoryData",
  GIVE_OFFER: "/deal/giveOffer",
  GET_LIVE_DATA: "data/getLiveData",
  GET_DEAL_DETAILS: "/deal/getDealDetails",
  COMPLETE_DEAL: "/deal/completeDeal",
  CREATE_AUCTION: "/auction/createAuction",
  GET_LIVE_AUCTIONS: "/auction/getLiveAuctions",
  GET_UPCOMING_AUCTIONS: "/auction/getUpcomingAuctions",
  GET_MY_AUCTIONS: "/auction/getMyAuctions",
  GET_AUCTION_DETAILS: "/auction/getUpcomingAuctionDetails",
  START_AUCTION: "/auction/startAuction",
};
