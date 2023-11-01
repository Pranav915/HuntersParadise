import { apiCall } from "api";
import { ENDPOINTS } from "constants/AppConstants";
import { openAlertMessage } from "./alertActions";
import { setUserDetails } from "./authActions";

export const mainActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getMainActions = (dispatch) => {
  return {
    addInitialDetails: (userDetails, navigate) =>
      dispatch(addInitialDetails(userDetails, navigate)),
  };
};

const addInitialDetails = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await apiCall(userDetails, ENDPOINTS.ADD_INITIAL_DETAILS, "POST");
    if (response.error) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
      const { userDetails } = response?.data;
      if (userDetails.age) {
        navigate("/");
      } else {
        navigate("/initialDetails");
      }
      localStorage.setItem("user", JSON.stringify(userDetails));
      dispatch(setUserDetails(userDetails));
    }
  };
};
