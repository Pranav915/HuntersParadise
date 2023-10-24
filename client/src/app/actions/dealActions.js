import { apiCall } from "api";
import { ENDPOINTS } from "constants/AppConstants";

export const dealActions = {
  SET_CREATED_DEALS: "DEAL.SET_CREATED_DEALS",
  SET_PARTICIPATED_DEALS: "DEAL.SET_PARTICIPATED_DEALS",
  SET_ALL_DEALS: "DEAL.SET_ALL_DEALS",
};

export const getDealActions = (dispatch) => {
  return {
    setCreatedDeals: (data) => dispatch(setCreatedDeals(data)),
    setParticipatedDeals: (data) => dispatch(setParticipatedDeals(data)),
    setAllDeals: (data) => dispatch(setAllDeals(data)),
    createDeal: (dealDetails) => dispatch(createDeal(dealDetails)),
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
