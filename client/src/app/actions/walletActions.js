import { apiCall } from "api";
import { ENDPOINTS } from "constants/AppConstants";
import { openAlertMessage } from "./alertActions";

export const walletActions = {
  SET_TOTAL_BALANCE: "DASHBOARD.SET_TOTAL_BALANCE",
  SET_AVAILABLE_BALANCE: "DASHBOARD.SET_AVAILABLE_BALANCE",
  SET_FREEZED_BALANCE: "DASHBOARD.SET_FREEZED_BALANCE",
  SET_OUTSTANDING_BALANCE: "DASHBOARD.SET_OUTSTANDING_BALANCE",
  SET_PENDING_TRANSACTIONS: "DASHBOARD.SET_PENDING_TRANSACTIONS",
  SET_COMPLETE_TRANSACTIONS: "DASHBOARD.SET_COMPLETE_TRANSACTIONS",
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

export const setPendingTransactions = (pendingTransactions) => {
  return {
    type: walletActions.SET_PENDING_TRANSACTIONS,
    pendingTransactions,
  };
};

export const setCompleteTransactions = (completeTransactions) => {
  return {
    type: walletActions.SET_COMPLETE_TRANSACTIONS,
    completeTransactions,
  };
};

export const getWalletActions = (dispatch) => {
  return {
    setTotalBalance: (totalBalance) => dispatch(setTotalBalance(totalBalance)),
    setFreezedBalance: (freezedBalance) => dispatch(setFreezedBalance(freezedBalance)),
    setOutstandingBalance: (outstandingBalance) =>
      dispatch(setOutstandingBalance(outstandingBalance)),
    setAvailableBalance: (availableBalance) => dispatch(setAvailableBalance(availableBalance)),
    setPendingTransactions: (pendingTransactions) =>
      dispatch(setPendingTransactions(pendingTransactions)),
    setCompleteTransactions: (completeTransactions) =>
      dispatch(setCompleteTransactions(completeTransactions)),
    addFund: (req) => dispatch(addFund(req)),
    withdrawFund: (req) => dispatch(withdrawFund(req)),
    getTransactions: () => dispatch(getTransactions()),
    getBalance: () => dispatch(getBalance()),
    completeTransaction: (req) => dispatch(completeTransaction(req)),
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
      dispatch(getTransactions());
    }
  };
};
export const withdrawFund = (req) => {
  return async (dispatch) => {
    const response = await apiCall(req, ENDPOINTS.WITHDRAW_FUND, "POST");
    if (response.error) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
      console.log("response", response);
      dispatch(setTotalBalance(response?.data?.totalBalance));
      dispatch(setAvailableBalance(response?.data?.availableBalance));
      dispatch(setFreezedBalance(response?.data?.freezedBalance));
      dispatch(setOutstandingBalance(response?.data?.outStandingBalance));
      dispatch(getTransactions());
    }
  };
};

export const getBalance = () => {
  return async (dispatch) => {
    const response = await apiCall({}, ENDPOINTS.GET_BALANCE, "GET");
    if (response.error) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
      console.log("response", response);
      dispatch(setTotalBalance(response?.data?.totalBalance));
      dispatch(setAvailableBalance(response?.data?.availableBalance));
      dispatch(setFreezedBalance(response?.data?.freezedBalance));
      dispatch(setOutstandingBalance(response?.data?.outStandingBalance));
    }
  };
};

export const getTransactions = () => {
  return async (dispatch) => {
    const response = await apiCall({}, ENDPOINTS.GET_TRANSACTIONS, "GET");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response2", response);
      let reversePTransactions = response?.data?.pendingTransaction.reverse();
      let reverseCTransactions = response?.data?.completeTransaction.reverse();
      dispatch(setPendingTransactions(reversePTransactions));
      dispatch(setCompleteTransactions(reverseCTransactions));
    }
  };
};

export const completeTransaction = (transactionId) => {
  return async (dispatch) => {
    const response = await apiCall(transactionId, ENDPOINTS.COMPLETE_TRANSACTION, "POST");
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      console.log("response", response);
      dispatch(getBalance());
      dispatch(getTransactions());
    }
  };
};
