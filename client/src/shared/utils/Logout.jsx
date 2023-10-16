import Cookies from "js-cookie";

export const Logout = () => {
  console.log("hello");
  localStorage.clear();
  Cookies.remove("clientId");
  window.location.pathname = "/login";
};
