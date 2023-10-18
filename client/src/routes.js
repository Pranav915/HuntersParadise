// Code Pulse React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import InitialDetails from "layouts/initialDetails";
import ForgotPassword from "layouts/authentication/forgot-password";
import ResetPassword from "layouts/authentication/reset-password";

// @mui icons
import Icon from "@mui/material/Icon";
import CreateDeal from "layouts/deals/createDeal";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "divider",
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "log-out",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/dashboard",
  },
  {
    type: "route",
    name: "Initial Details",
    key: "initial-details",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/initialDetails",
    component: <InitialDetails />,
  },
  {
    type: "route",
    name: "Forgot Password",
    key: "forgot-password",
    icon: <Icon fontSize="small">forgot</Icon>,
    route: "/forgotPassword",
    component: <ForgotPassword />,
  },
  {
    type: "route",
    name: "Reset Password",
    key: "reset-password",
    icon: <Icon fontSize="small">reset</Icon>,
    route: "/resetPassword",
    component: <ResetPassword />,
  },
  {
    type: "route",
    name: "Create Deal",
    key: "create-deal",
    icon: <Icon fontSize="small">create</Icon>,
    route: "/createDeal",
    component: <CreateDeal />,
  },
];

export default routes;
