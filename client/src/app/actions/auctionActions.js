import { apiCall } from "api";
import { openAlertMessage } from "./alertActions";
import { ENDPOINTS } from "constants/AppConstants";

export const auctionActions = {};

export const getAuctionActions = (dispatch) => {
  return {
    createAuction: (auctionDetails) => dispatch(createAuction(auctionDetails)),
  };
};

export const createAuction = (auctionDetails, navigate) => {
  return async (dispatch) => {
    const response = await apiCall(auctionDetails, ENDPOINTS.CREATE_AUCTION, "POST");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response", response);
    }
  };
};
