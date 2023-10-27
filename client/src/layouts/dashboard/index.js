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
  getMyDeals,
  getMyOffers,
  getPieChartData,
  allDeals,
  totalBalance,
  setTotalBalance,
  freezedBalance,
  setFreezedBalance,
  liveUserCount,
  setLiveUserCount,
  totalLiveDealsCount,
  setTotalLiveDeals,
  setTotalLiveDealsCount,
  categoryLiveDealsCount,
  setCategoryLiveDealsCount,
  liveAuctionsCount,
  setLiveAuctionsCount,
  totalAuctionParticipantsCount,
  setTotalAuctionParticipantsCount,
  pieChartData,
  setPieChartData,
  getLiveData,
}) => {
  const { sales, tasks } = reportsLineChartData;
  const [finalPieChartData, setfinalPieChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [finalBarChartData, setFinalBarChartData] = useState({
    labels: [],
    datasets: [],
  });
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
    setTotalBalance(userDetails?.wallet?.totalBalance);
    setFreezedBalance(userDetails?.wallet?.freezedBalance);
    setLiveUserCount(0);
    setCategoryLiveDealsCount(0);
    setTotalAuctionParticipantsCount(0);

    getAllDeals();
    getMyDeals();
    getMyOffers();
    getPieChartData();
    getLiveData();
  }, []);

  useEffect(() => {
    let barChartData = {
      labels: pieChartData?.map((element) => {
        let labelsList = [];
        labelsList.push(element?.category);
        return labelsList;
      }),
      datasets: [
        {
          label: "Category Deals",
          data: pieChartData?.map((element) => {
            let dataList = [];
            dataList.push(element?.numberDeals);
            return dataList;
          }),
        },
        {
          label: "Category Valuation",
          data: pieChartData?.map((element) => {
            let dataList = [];
            dataList.push(element?.valuation);
            return dataList;
          }),
        },
      ],
    };
    setFinalBarChartData(barChartData);
    let chartData = {
      labels: pieChartData?.map((element) => {
        let labelsList = [];
        labelsList.push(element?.category);
        return labelsList;
      }),
      datasets: [
        {
          label: "Live Deals",
          data: pieChartData?.map((element) => {
            let dataList = [];
            dataList.push(element?.numberLiveDeals);
            return dataList;
          }),

          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966CC",
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#FF5733",
            "#0D98BA",
            "#FF9900",
          ],
          hoverOffset: 4,
        },
        // {
        //   label: "Users",
        //   data: pieChartData?.map((element) => {
        //     let dataList = [];
        //     dataList.push(element?.numberSubscribers);
        //     return dataList;
        //   }),
        //   backgroundColor: [
        //     "#FF6384",
        //     "#36A2EB",
        //     "#FFCE56",
        //     "#4BC0C0",
        //     "#9966CC",
        //     "#F7464A",
        //     "#46BFBD",
        //     "#FDB45C",
        //     "#FF5733",
        //     "#0D98BA",
        //     "#FF9900",
        //   ],
        //   hoverOffset: 4,
        // },
      ],
    };
    setfinalPieChartData(chartData);
  }, [setPieChartData, pieChartData]);

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
                  amount: freezedBalance,
                  label: "Freezed Balance",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Live Users"
                count={liveUserCount}
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
                count={totalLiveDealsCount}
                percentage={{
                  color: "success",
                  amount: categoryLiveDealsCount,
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
                count={liveAuctionsCount}
                percentage={{
                  color: "success",
                  amount: totalAuctionParticipantsCount,
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
                  chart={finalBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                {pieChartData ? (
                  <PieChart
                    icon={{ color: "info", component: "wallet" }}
                    title="Category Distribution"
                    description=""
                    height={250}
                    chart={finalPieChartData}
                  />
                ) : (
                  <></>
                )}
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

const mapStoreStateToProps = ({ auth, dashboard }) => {
  return {
    ...auth,
    ...dashboard,
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
