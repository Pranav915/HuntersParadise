import notificationActions from "app/actions/notificationActions";
import { walletActions } from "app/actions/walletActions";

const initState = {
  totalBalance: 0,
  freezedBalance: 0,
  availableBalance: 0,
  outstandingBalance: 0,
  pendingTransactions: [],
  completeTransactions: [],
};

const walletReducer = (state = initState, action) => {
  switch (action.type) {
    case walletActions.SET_TOTAL_BALANCE:
      return {
        ...state,
        totalBalance: action.totalBalance,
      };
    case walletActions.SET_FREEZED_BALANCE:
      return {
        ...state,
        freezedBalance: action.freezedBalance,
      };
    case walletActions.SET_AVAILABLE_BALANCE:
      return {
        ...state,
        availableBalance: action.availableBalance,
      };
    case walletActions.SET_OUTSTANDING_BALANCE:
      return {
        ...state,
        outstandingBalance: action.outstandingBalance,
      };
    case walletActions.SET_PENDING_TRANSACTIONS:
      return {
        ...state,
        pendingTransactions: action.pendingTransactions,
      };
    case walletActions.SET_COMPLETE_TRANSACTIONS:
      return {
        ...state,
        completeTransactions: action.completeTransactions,
      };
    default:
      return state;
  }
};

export default walletReducer;
