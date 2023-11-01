import { apiCall } from "api";
import { ENDPOINTS } from "constants/AppConstants";
import { openAlertMessage } from "./alertActions";

export const walletActions = {
  SET_TOTAL_BALANCE: "DASHBOARD.SET_TOTAL_BALANCE",
  SET_AVAILABLE_BALANCE: "DASHBOARD.SET_AVAILABLE_BALANCE",
  SET_FREEZED_BALANCE: "DASHBOARD.SET_FREEZED_BALANCE",
  SET_OUTSTANDING_BALANCE: "DASHBOARD.SET_OUTSTANDING_BALANCE",
};

export const setTotalBalance = (totalBalance) => {
  return {
    type: walletActions.SET_TOTAL_BALANCE,
    totalBalance,
  };
};

export const setFreezedBalance = (freezedBalance) => {
  return {
    type: walletActions.SET_FREEZED_BALANCE,
    freezedBalance,
  };
};

export const setAvailableBalance = (availableBalance) => {
  return {
    type: walletActions.SET_AVAILABLE_BALANCE,
    availableBalance,
  };
};

export const setOutstandingBalance = (outstandingBalance) => {
  return {
    type: walletActions.SET_OUTSTANDING_BALANCE,
    outstandingBalance,
  };
};

export const getWalletActions = (dispatch) => {
  return {
    setTotalBalance: (totalBalance) => dispatch(setTotalBalance(totalBalance)),
    setFreezedBalance: (freezedBalance) => dispatch(setFreezedBalance(freezedBalance)),
    setOutstandingBalance: (outstandingBalance) =>
      dispatch(setOutstandingBalance(outstandingBalance)),
    setAvailableBalance: (availableBalance) => dispatch(setAvailableBalance(availableBalance)),
    addFund: (req) => dispatch(addFund(req)),
    withdrawFund: (req) => dispatch(withdrawFund(req)),
    getBalance: () => dispatch(getBalance()),
  };
};

export const addFund = (req) => {
  return async (dispatch) => {
    const response = await apiCall(req, ENDPOINTS.ADD_FUND, "POST");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response", response);
      dispatch(setTotalBalance(response?.data?.totalBalance));
      dispatch(setAvailableBalance(response?.data?.availableBalance));
      dispatch(setFreezedBalance(response?.data?.freezedBalance));
      dispatch(setOutstandingBalance(response?.data?.outStandingBalance));
    }
  };
};
export const withdrawFund = (req) => {
  return async (dispatch) => {
    const response = await apiCall(req, ENDPOINTS.WITHDRAW_FUND, "POST");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response", response);
      dispatch(setTotalBalance(response?.data?.totalBalance));
      dispatch(setAvailableBalance(response?.data?.availableBalance));
      dispatch(setFreezedBalance(response?.data?.freezedBalance));
      dispatch(setOutstandingBalance(response?.data?.outStandingBalance));
    }
  };
};

export const getBalance = () => {
  return async (dispatch) => {
    const response = await apiCall({}, ENDPOINTS.GET_BALANCE, "GET");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response", response);
      dispatch(setTotalBalance(response?.data?.totalBalance));
      dispatch(setAvailableBalance(response?.data?.availableBalance));
      dispatch(setFreezedBalance(response?.data?.freezedBalance));
      dispatch(setOutstandingBalance(response?.data?.outStandingBalance));
    }
  };
};
