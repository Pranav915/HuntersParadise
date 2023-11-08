import { apiCall } from "api";
import { openAlertMessage } from "./alertActions";
import { ENDPOINTS } from "constants/AppConstants";

export const auctionActions = {
  SET_LIVE_AUCTIONS: "AUCTION.SET_LIVE_AUCTIONS",
  SET_UPCOMING_AUCTIONS: "AUCTION.SET_UPCOMING_AUCTIONS",
  SET_MY_AUCTIONS: "AUCTION.SET_MY_AUCTIONS",
};

export const getAuctionActions = (dispatch) => {
  return {
    createAuction: (auctionDetails) => dispatch(createAuction(auctionDetails)),
    getLiveAuctions: () => dispatch(getLiveAuctions()),
    getUpcomingAuctions: () => dispatch(getUpcomingAuctions()),
    getMyAuctions: () => dispatch(getMyAuctions()),
    setLiveAuctions: (data) => dispatch(setLiveAuctions(data)),
    setUpcomingAuctions: (data) => dispatch(setUpcomingAuctions(data)),
    setMyAuctions: (data) => dispatch(setMyAuctions(data)),
    getAuctionDetails: (auctionId, setAuctionDetails, setIsLoading, setIsHost) =>
      dispatch(getAuctionDetails(auctionId, setAuctionDetails, setIsLoading, setIsHost)),
    getLiveAuctionDetails: (auctionId, setLiveAuctionDetails, setIsLoading, setIsHost) =>
      dispatch(getLiveAuctionDetails(auctionId, setLiveAuctionDetails, setIsLoading, setIsHost)),
    startAuction: (auctionId, navigate) => dispatch(startAuction(auctionId, navigate)),
    startProduct: (req) => dispatch(startProduct(req)),
    newBid: (req) => dispatch(newBid(req)),
    bidDone: (req) => dispatch(bidDone(req)),
    endAuction: (req) => dispatch(endAuction(req)),
  };
};

export const setLiveAuctions = (data) => {
  return {
    type: auctionActions.SET_LIVE_AUCTIONS,
    data,
  };
};

export const setUpcomingAuctions = (data) => {
  return {
    type: auctionActions.SET_UPCOMING_AUCTIONS,
    data,
  };
};

export const setMyAuctions = (data) => {
  return {
    type: auctionActions.SET_MY_AUCTIONS,
    data,
  };
};

export const createAuction = (auctionDetails) => {
  return async (dispatch) => {
    const response = await apiCall(auctionDetails, ENDPOINTS.CREATE_AUCTION, "POST");
    if (response.error) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
      dispatch(getUpcomingAuctions());
      dispatch(getMyAuctions());
      dispatch(getLiveAuctions());
    }
  };
};

export const getLiveAuctions = () => {
  return async (dispatch) => {
    const response = await apiCall({}, ENDPOINTS.GET_LIVE_AUCTIONS, "GET");
    if (response.error) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
      dispatch(setLiveAuctions(response?.data));
    }
  };
};

export const getUpcomingAuctions = () => {
  return async (dispatch) => {
    const response = await apiCall({}, ENDPOINTS.GET_UPCOMING_AUCTIONS, "GET");
    if (response.error) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
      dispatch(setUpcomingAuctions(response?.data));
    }
  };
};

export const getMyAuctions = () => {
  return async (dispatch) => {
    const response = await apiCall({}, ENDPOINTS.GET_MY_AUCTIONS, "GET");
    if (response.error) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
      dispatch(setMyAuctions(response?.data?.upcomingAuctions));
    }
  };
};

export const getAuctionDetails = (auctionId, setAuctionDetails, setIsLoading, setIsHost) => {
  return async (dispatch) => {
    const response = await apiCall(
      {},
      ENDPOINTS.GET_AUCTION_DETAILS + "?auctionId=" + auctionId,
      "GET"
    );
    if (response.error) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
      setAuctionDetails(response?.data?.auction);
      setIsHost(response?.data?.isHost);
      setIsLoading(false);
    }
  };
};

export const startAuction = (auctionId, navigate) => {
  return async (dispatch) => {
    const response = await apiCall(auctionId, ENDPOINTS.START_AUCTION, "POST");
    if (response.error) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
      dispatch(
        openAlertMessage({
          title: "Success",
          content: response?.data,
        })
      );
    }
  };
};

export const getLiveAuctionDetails = (
  auctionId,
  setLiveAuctionDetails,
  setIsLoading,
  setIsHost
) => {
  return async (dispatch) => {
    const response = await apiCall(
      {},
      ENDPOINTS.GET_LIVE_AUCTION_DETAILS + "?auctionId=" + auctionId,
      "GET"
    );
    if (response.error) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
      setLiveAuctionDetails(response?.data?.auction);
      setIsHost(response?.data?.isHost);
      setIsLoading(false);
    }
  };
};

export const startProduct = (req) => {
  return async (dispatch) => {
    const response = await apiCall(req, ENDPOINTS.START_PRODUCT, "POST");
    if (response.error) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
    }
  };
};

export const newBid = (req) => {
  return async (dispatch) => {
    const response = await apiCall(req, ENDPOINTS.NEW_BID, "POST");
    if (response.error) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
    }
  };
};

export const bidDone = (req) => {
  return async (dispatch) => {
    const response = await apiCall(req, ENDPOINTS.BID_DONE, "POST");
    if (response.error) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
    }
  };
};

export const endAuction = (req) => {
  return async (dispatch) => {
    const response = await apiCall(req, ENDPOINTS.END_AUCTION, "POST");
    if (response.error) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
    }
  };
};
