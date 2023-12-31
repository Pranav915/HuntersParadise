import { authActions } from "app/actions/authActions";
const initState = {
  userDetails: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authActions.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };
    default:
      return state;
  }
};

export default authReducer;
