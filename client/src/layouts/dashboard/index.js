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
import { getAuctionActions } from "app/actions/auctionActions";
import Cookies from "js-cookie";
import PieChart from "examples/Charts/PieChart";
import { useAbly, useChannel } from "ably/react";

const Dashboard = ({
  userDetails,
  setUserDetails,
  getAllDeals,
  getMyDeals,
  getMyOffers,
  getPieChartData,
  totalBalance,
  setTotalBalance,
  freezedBalance,
  setFreezedBalance,
  liveUserCount,
  setLiveUserCount,
  totalLiveDealsCount,
  setTotalLiveDealsCount,
  categoryLiveDealsCount,
  setCategoryLiveDealsCount,
  liveAuctionsCount,
  totalAuctionParticipantsCount,
  setTotalAuctionParticipantsCount,
  pieChartData,
  setPieChartData,
  getLiveData,
  getLiveAuctions,
  getMyAuctions,
  openAlertMessage,
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
  const ably = useAbly();

  const dealChannel = useChannel({ channelName: "dealChannel" }, (message) => {
    console.log(message);
    if (message.name == "DealCreated") {
      setTotalLiveDealsCount(totalLiveDealsCount + 1);
      if (userDetails.categories.includes(message.data.deal.category)) {
        setCategoryLiveDealsCount(categoryLiveDealsCount + 1);
        openAlertMessage("New deal added in your category.");
      }

      // Update Pie Chart Data
      let tempPieData = pieChartData.map((data) => {
        if (data.category === message.data.deal.category) {
          return {
            ...data,
            numberLiveDeals: data.numberLiveDeals + 1,
          };
        }
        return data;
      });
      setPieChartData(tempPieData);
    } else if (message.name == "DealCompleted") {
      setTotalLiveDealsCount(totalLiveDealsCount - 1);
      if (userDetails.categories.includes(message.data.deal.category)) {
        setCategoryLiveDealsCount(categoryLiveDealsCount - 1);
      }

      // Update Pie Chart Data
      let tempPieChartData = pieChartData.map((data) => {
        if (data.category === message.data.deal.category) {
          return {
            ...data,
            numberLiveDeals: data.numberLiveDeals - 1,
            numberDeals: data.numberDeals + 1,
            valuation: data.valuation + parseInt(message.data.deal.price),
          };
        }
        return data;
      });
      setPieChartData(tempPieChartData);
    }
  }).channel;

  dealChannel.presence.subscribe("enter", function (member) {
    setLiveUserCount(liveUserCount + 1);
    console.log("Member " + member.clientId + " entered");
  });

  dealChannel.presence.subscribe("leave", function (member) {
    setLiveUserCount(liveUserCount - 1);
    console.log("Member " + member.clientId + " left");
  });

  dealChannel.presence.get(function (err, members) {
    console.log("There are " + members.length + " members on this channel");
    setLiveUserCount(members.length);
    members.forEach((m) => {
      console.log(m.clientId);
    });
  });

  useEffect(() => {
    dealChannel.presence.enter();
  }, []);

  dealChannel.subscribe("[meta]occupancy", (message) => {
    console.log("occupancy: ", message.data);
  });

  useEffect(() => {
    const user = new URLSearchParams(search).get("user");
    if (user) {
      const data = jwt_decode(user).userDetails;
      console.log("data", data);
      setUserDetails(data);
      if (!data?.age) {
        navigate("/initialDetails");
      }
      initializeAblyClient(userDetails?.username);
      setLiveUserCount(0);
      setTotalAuctionParticipantsCount(0);
      getAllDeals();
      getMyDeals();
      getMyOffers();
      getLiveAuctions();
      getMyAuctions();
      getPieChartData();
      getLiveData();
      Cookies.set("clientId", data?.username);
    } else if (userDetails) {
      if (!userDetails.age) {
        navigate("/initialDetails");
      } else {
        setLiveUserCount(0);
        setTotalAuctionParticipantsCount(0);
        getAllDeals();
        getMyDeals();
        getMyOffers();
        getLiveAuctions();
        getMyAuctions();
        getPieChartData();
        getLiveData();
        Cookies.set("clientId", userDetails?.username);
      }
      // dealChannel.presence.enter();
    } else {
      navigate("/authentication/sign-in");
    }
  }, []);

  useEffect(() => {
    setTotalBalance(userDetails?.wallet?.totalBalance);
    setFreezedBalance(userDetails?.wallet?.freezedBalance);
  }, [userDetails, setUserDetails]);

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
            return element?.numberLiveDeals;
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
      {dealChannel.presence.enter()}
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
                  label: "In Your Favourite Categories",
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
                  label: "Participants",
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
                <PieChart
                  icon={{ color: "info", component: "category" }}
                  title="Category Distribution"
                  height={250}
                  chart={finalPieChartData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Projects name="Auctions" />
            </Grid>
            <Grid item xs={12}>
              <Projects name="Deals" />
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
    ...getAuctionActions(dispatch),
  };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(Dashboard);
