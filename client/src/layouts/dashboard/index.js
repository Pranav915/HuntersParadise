/* eslint-disable react/prop-types */

// @mui material components
import Grid from "@mui/material/Grid";

// Code Pulse React components
import MDBox from "components/MDBox";

// Code Pulse React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import pieChartData from "./data/pieChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { initializeAblyClient } from "../../ably";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuthActions } from "app/actions/authActions";
import { getMainActions } from "app/actions/mainActions";
import { getActions } from "app/actions/alertActions";
import { getDashboardActions } from "app/actions/dashboardActions";
import { getDealActions } from "app/actions/dealActions";
import Cookies from "js-cookie";
import PieChart from "examples/Charts/PieChart";
import { useAbly, useChannel, usePresence } from "ably/react";

const Dashboard = ({
  userDetails,
  setUserDetails,
  openAlertMessage,
  getDashboardDetails,
  getAllDeals,
  getMyOffers,
  allDeals,
}) => {
  const { sales, tasks } = reportsLineChartData;
  const [liveUsers, setLiveUsers] = useState(0);
  const [liveDeals, setLiveDeals] = useState("");
  const [liveAuctions, setLiveAuctions] = useState("");
  const [totalBalance, setTotalBalance] = useState("");
  const search = useLocation().search;
  const navigate = useNavigate();
  const dealChannel = useChannel("dealChannel", (message) => {
    console.log("message", message.presence);
    const content = JSON.parse(message?.data);
    console.log("content", content);
    openAlertMessage("New Deal Added");
  }).channel;

  useEffect(() => {
    const user = new URLSearchParams(search).get("user");
    if (user) {
      const data = jwt_decode(user).userDetails;
      console.log("data", data);
      setUserDetails(data);
      if (!data?.age) {
        navigate("/initialDetails");
      } else {
        navigate("/dashboard");
      }
      Cookies.set("clientId", data?.username);
    } else if (userDetails) {
      if (!userDetails.age) {
        navigate("/initialDetails");
      }
    } else {
      navigate("/authentication/sign-in");
    }
    initializeAblyClient(userDetails?.username);
    getAllDeals();
    getMyOffers();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="account_balance"
                title="Total Balance"
                count={totalBalance}
                percentage={{
                  color: "success",
                  amount: "+2%",
                  label: "than other users",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Live Users"
                count={liveUsers}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="handshake"
                title="Live Deals"
                count={liveDeals}
                percentage={{
                  color: "success",
                  amount: "*",
                  label: "In your categories",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="gavel"
                title="Live Auctions"
                count={liveAuctions}
                percentage={{
                  color: "success",
                  amount: "34k",
                  label: "participants",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <MDBox mb={2}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <PieChart
                  icon={{ color: "info", component: "wallet" }} // Optional: Icon and its color
                  title="Category Distribution" // Optional: Chart title
                  description="" // Optional: Chart description
                  height={250} // Optional: Chart height (you can specify a number or string)
                  chart={pieChartData} // Pass the chart data defined in step 2
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Projects name="Auctions" />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Projects name="Deals" data={allDeals} />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

const mapStoreStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getAuthActions(dispatch),
    ...getMainActions(dispatch),
    ...getActions(dispatch),
    ...getDashboardActions(dispatch),
    ...getDealActions(dispatch),
  };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(Dashboard);
