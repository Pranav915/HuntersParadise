import Cookies from "js-cookie";

export const Logout = () => {
  window.location.pathname = "/authentication/sign-in";
  localStorage.clear();
  Cookies.remove("clientId");
};
