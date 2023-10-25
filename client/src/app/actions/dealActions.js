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
    setAllDeals: (data) => dispatch(setAllDeals(data)),
    createDeal: (dealDetails) => dispatch(createDeal(dealDetails)),
    getAllDeals: () => dispatch(getAllDeals()),
    getMyOffers: () => dispatch(getMyOffers()),
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

export const setAllDeals = (data) => {
  return {
    type: dealActions.SET_ALL_DEALS,
    data,
  };
};

export const setMyOffers = (data) => {
  return {
    type: dealActions.SET_MY_OFFERS,
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
      console.log("response", response);
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

export const getMyOffers = () => {
  return async (dispatch) => {
    const response = await apiCall({}, ENDPOINTS.GET_MY_OFFERS, "GET");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response", response);
      dispatch(setMyOffers(response?.data));
    }
  };
};