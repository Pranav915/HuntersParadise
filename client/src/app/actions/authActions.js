import { apiCall } from "api";
import { ENDPOINTS } from "constants/AppConstants";
import { openAlertMessage } from "./alertActions";
import Cookies from "js-cookie";
import { initializeAblyClient } from "../../ably";

export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const setUserDetails = (userDetails) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

export const getAuthActions = (dispatch) => {
  return {
    login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
    register: (userDetails, navigate) => dispatch(register(userDetails, navigate)),
    requestPasswordReset: (userDetails, navigate) =>
      dispatch(requestPasswordReset(userDetails, navigate)),
    passwordReset: (userDetails, navigate) => dispatch(passwordReset(userDetails, navigate)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
  };
};

export const login = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await apiCall(userDetails, ENDPOINTS.LOGIN, "POST");
    if (response.error) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
      const { userDetails } = response?.data;
      Cookies.set("clientId", userDetails?.username);
      await initializeAblyClient(Cookies.get("clientId"));
      if (userDetails.age) {
        navigate("/dashboard");
      } else {
        navigate("/initialDetails");
      }
      localStorage.setItem("user", JSON.stringify(userDetails));
      dispatch(setUserDetails(userDetails));
    }
  };
};

export const register = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await apiCall(userDetails, ENDPOINTS.REGISTER, "POST");
    if (response.error) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
      const { userDetails } = response?.data;
      Cookies.set("clientId", userDetails?.username);
      await initializeAblyClient(Cookies.get("clientId"));
      if (userDetails?.age) {
        navigate("/dashboard");
      } else {
        navigate("/initialDetails");
      }
      localStorage.setItem("user", JSON.stringify(userDetails));
      dispatch(setUserDetails(userDetails));
    }
  };
};

export const requestPasswordReset = (userDetails, setMailStatus) => {
  return async (dispatch) => {
    const response = await apiCall(userDetails, ENDPOINTS.REQUEST_PASSWORD_RESET, "POST");
    if (response.status !== 200) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
      setMailStatus(true);
    }
  };
};

export const passwordReset = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await apiCall(userDetails, ENDPOINTS.PASSWORD_RESET, "POST");
    if (response.status !== 200) {
      dispatch(
        openAlertMessage({
          title: "Error",
          content: response?.exception?.response?.data,
        })
      );
    } else {
      dispatch(openAlertMessage("Password updated successfully"));
      navigate("/");
    }
  };
};
