import { dealActions } from "app/actions/dealActions";

const initState = {
  createdDeals: [],
  participatedDeals: [],
  allDeals: [],
};

const dealReducer = (state = initState, action) => {
  switch (action.type) {
    case dealActions.SET_CREATED_DEALS:
      return {
        ...state,
        createdDeals: action.data,
      };
    case dealActions.SET_PARTICIPATED_DEALS:
      return {
        ...state,
        participatedDeals: action.data,
      };
    case dealActions.SET_ALL_DEALS:
      return {
        ...state,
        allDeals: action.data,
      };

    default:
      return state;
  }
};

export default dealReducer;
