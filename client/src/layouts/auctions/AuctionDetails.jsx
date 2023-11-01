/* eslint-disable react/prop-types */
import { Button, Card, CardContent, CardMedia, CircularProgress, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import DetailsCard from "./components/DetailsCard";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuctionActions } from "app/actions/auctionActions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import GavelIcon from "@mui/icons-material/Gavel";
import MDButton from "components/MDButton";
import { useChannel } from "ably/react";

const AuctionDetails = ({ getAuctionDetails, startAuction }) => {
  const location = useLocation();
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHost, setIsHost] = useState(false);
  const [isTime, setIsTime] = useState(true);
  const navigate = useNavigate();

  const { channel } = useChannel("dealChannel", (message) => {
    if (message.name == "AuctionStarted") {
      navigate(`/liveAuction/${auctionDetails?.auctionId}`, {
        state: { data: { auction: auction, sender: "all" } },
      });
    }
  });

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formatAuctionStartTime = (startTime) => {
    const date = new Date(startTime);
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    console.log("location.state.data", location.state.data);
    getAuctionDetails(
      location?.state?.data?.auction?.auctionId,
      setAuctionDetails,
      setIsLoading,
      setIsHost
    );
  }, []);

  const handleStartAuction = () => {
    startAuction({ auctionId: auctionDetails.auctionId }, navigate);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <MDBox pt={6} pb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MDBox display="flex" justifyContent="space-between">
                <MDTypography variant="h4" color="white">
                  {auctionDetails?.auctionTitle}
                </MDTypography>
                {isHost ? (
                  <MDButton
                    variant="contained"
                    color="success"
                    endIcon={<GavelIcon />}
                    disabled={!isTime}
                    onClick={handleStartAuction}
                  >
                    Start Auction
                  </MDButton>
                ) : (
                  <>
                    {/* <MDButton variant="contained" color="success" startIcon={<LoginIcon />}>
                    Enter Auction Arena
                  </MDButton> */}
                  </>
                )}
              </MDBox>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} md={3}>
                  <Card align="center">
                    <MDBox>
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        height="200"
                        image={auctionDetails?.auctionHost?.profilePhoto}
                        sx={{ width: "250px" }}
                      />
                      <CardContent>
                        <MDTypography variant="h4" align="center" pt={1}>
                          {auctionDetails?.auctionHost?.name}
                        </MDTypography>
                      </CardContent>
                    </MDBox>
                  </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container p={5} pl={10}>
                    <Grid item xs={12} mt={2.5}>
                      <MDTypography variant="h5" color="text">
                        Auction Start Time
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <MDTypography component="p" variant="button" color="text">
                        {formatAuctionStartTime(auctionDetails?.startTime)}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} mt={2.5}>
                      <MDTypography variant="h5" color="text">
                        Description
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <MDTypography
                        component="p"
                        variant="button"
                        color="text"
                        sx={{ textAlign: "justify" }}
                      >
                        {auctionDetails?.auctionDescription}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <MDBox mb={2}>
                <MDTypography variant="h4" color="white">
                  Products
                </MDTypography>
              </MDBox>
            </Grid>
          </Grid>
          <MDBox sx={{ maxHeight: "800px", overflowY: "auto" }}>
            <Grid container spacing={2}>
              {auctionDetails?.productList.map((product, key) => (
                <Grid item xs={12} md={6} key={key}>
                  <DetailsCard product={product} />
                </Grid>
              ))}
            </Grid>
          </MDBox>
        </MDBox>
      )}
    </DashboardLayout>
  );
};

const mapStoreStateToProps = ({ auth, auction }) => {
  return {
    ...auction,
    ...auth,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getAuctionActions(dispatch),
  };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(AuctionDetails);
