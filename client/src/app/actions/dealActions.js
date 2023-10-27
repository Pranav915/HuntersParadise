import { darkScrollbar } from "@mui/material";
import { apiCall } from "api";
import { ENDPOINTS } from "constants/AppConstants";
import { openAlertMessage } from "./alertActions";

export const dealActions = {
  SET_CREATED_DEALS: "DEAL.SET_CREATED_DEALS",
  SET_PARTICIPATED_DEALS: "DEAL.SET_PARTICIPATED_DEALS",
  SET_ALL_DEALS: "DEAL.SET_ALL_DEALS",
  SET_MY_OFFERS: "DEAL.SET_MY_OFFERS",
};

export const getDealActions = (dispatch) => {
  return {
    setCreatedDeals: (data) => dispatch(setCreatedDeals(data)),
    setParticipatedDeals: (data) => dispatch(setParticipatedDeals(data)),
    createDeal: (dealDetails) => dispatch(createDeal(dealDetails)),
    getDealDetails: (dealId, setDealDetails) => dispatch(getDealDetails(dealId, setDealDetails)),
    getAllDeals: () => dispatch(getAllDeals()),
    getMyDeals: () => dispatch(getMyDeals()),
    getMyOffers: () => dispatch(getMyOffers()),
    submitOffer: (offerDetails, setShowEdit, setOfferedPrice) =>
      dispatch(submitOffer(offerDetails, setShowEdit, setOfferedPrice)),
  };
};

export const setAllDeals = (data) => {
  return {
    type: dealActions.SET_ALL_DEALS,
    data,
  };
};

export const setCreatedDeals = (data) => {
  return {
    type: dealActions.SET_CREATED_DEALS,
    data,
  };
};

export const setParticipatedDeals = (data) => {
  return {
    type: dealActions.SET_PARTICIPATED_DEALS,
    data,
  };
};

export const createDeal = (dealDetails) => {
  return async (dispatch) => {
    console.log("dealDetails", dealDetails);
    const response = await apiCall(dealDetails, ENDPOINTS.CREATE_DEAL, "POST");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      dispatch(openAlertMessage(response?.data));
    }
  };
};

export const getDealDetails = (dealId, setDealDetails) => {
  return async (dispatch) => {
    console.log("dealDetails", dealId);
    const response = await apiCall({}, ENDPOINTS.GET_DEAL_DETAILS + "?dealId=" + dealId, "GET");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response", response);
      setDealDetails(response?.data);
    }
  };
};

export const getAllDeals = () => {
  return async (dispatch) => {
    const response = await apiCall({}, ENDPOINTS.GET_ALL_DEALS, "GET");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response", response);
      dispatch(setAllDeals(response?.data));
    }
  };
};

export const getMyDeals = () => {
  return async (dispatch) => {
    const response = await apiCall({}, ENDPOINTS.GET_MY_DEALS, "GET");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response", response);
      dispatch(setCreatedDeals(response?.data));
    }
  };
};

export const getMyOffers = () => {
  return async (dispatch) => {
    const response = await apiCall({}, ENDPOINTS.GET_MY_OFFERS, "GET");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response", response);
      dispatch(setParticipatedDeals(response?.data));
    }
  };
};

export const submitOffer = (offerDetails, setShowEdit, setOfferedPrice) => {
  return async (dispatch) => {
    const response = await apiCall(offerDetails, ENDPOINTS.GIVE_OFFER, "POST");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response", response);
      dispatch("Offer added successfully.");
      setOfferedPrice(response?.data?.offeredPrice);
      setShowEdit(false);
    }
  };
};
