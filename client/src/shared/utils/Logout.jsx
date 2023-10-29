import Cookies from "js-cookie";

export const Logout = () => {
  console.log("hello");
  window.location.pathname = "/login";
  localStorage.clear();
  Cookies.remove("clientId");
};
