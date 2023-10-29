import Cookies from "js-cookie";

export const Logout = () => {
  localStorage.clear();
  Cookies.remove("clientId");
  window.location.pathname = "/authentication/sign-in";
};
