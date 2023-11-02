/* eslint-disable react/prop-types */
import { Card, Grid, Icon, IconButton } from "@mui/material";
import { useChannel } from "ably/react";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import { useEffect, useState } from "react";
import { getAuctionActions } from "app/actions/auctionActions";
import { connect } from "react-redux";

const BidPage = ({
  liveAuctionDetails,
  isHost,
  selectedProduct,
  newBid,
  highestBidder,
  setHighestBidder,
  bidDone,
}) => {
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  const [bid, setBid] = useState(null);

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = darkMode ? white.main : dark.main;

      if (transparentNavbar) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  const auctionArenaChannel = useChannel(
    "auction:" + liveAuctionDetails?.auctionId,
    "NewBid",
    (message) => {
      console.log("message", message);
      setHighestBidder(message?.data?.bidData);
    }
  ).channel;

  const handleAddBid = () => {
    const req = {
      auctionId: liveAuctionDetails?.auctionId,
      bidValue: bid,
    };
    console.log("req", req);
    newBid(req);
  };

  const handleCompleteDeal = () => {
    const req = {
      auctionId: liveAuctionDetails?.auctionId,
    };
    bidDone(req);
  };

  useEffect(() => {
    if (selectedProduct?.highestbid) {
      const data = {
        bidder: {
          name: selectedProduct?.highestbid?.highestBidder?.name,
          profilePhoto: selectedProduct?.highestbid?.highestBidder?.profilePhoto,
          country: selectedProduct?.highestbid?.highestBidder?.country,
        },
        bidValue: selectedProduct?.highestbid?.bidPrice,
      };
      setHighestBidder(data);
    }
  }, []);

  return (
    <Card>
      <MDBox p={2}>
        <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          <MDTypography variant="h4" color="text">
            {selectedProduct?.product?.name}
          </MDTypography>
        </MDBox>
        <MDBox
          sx={{
            overflowY: "auto",
            maxHeight: "620px",
            mt: 1,
            "::-webkit-scrollbar": {
              width: 0,
              background: "transparent",
            },
            "::-webkit-scrollbar-thumb": {
              background: "transparent",
            },
            scrollbarWidth: "none",
          }}
        >
          <MDBox mt={2}>
            <img
              src={selectedProduct?.product?.image}
              alt="test"
              style={{ width: "100%", height: "350px" }}
            />
          </MDBox>
          <MDBox mt={2}>
            <Grid container p={1}>
              <Grid item xs={12}>
                <MDTypography variant="h5" fontWeight="medium">
                  Description
                </MDTypography>
              </Grid>
              <Grid item>
                <MDTypography
                  component="p"
                  variant="button"
                  color="text"
                  sx={{ textAlign: "justify" }}
                >
                  {selectedProduct?.product?.description}
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mt={2}>
            <Grid container p={1}>
              <Grid item xs={12}>
                <MDTypography variant="h5" fontWeight="medium">
                  {selectedProduct?.status == "live" ? "TOP BIDDER" : "WINNER"}
                </MDTypography>
              </Grid>
              {highestBidder ? (
                <>
                  <Grid item xs={12} md={6}>
                    <Grid container alignItems="center" p={1}>
                      <Grid item>
                        <MDAvatar
                          src={highestBidder?.bidder?.profilePhoto}
                          alt="profile-image"
                          size="sm"
                          shadow="sm"
                        />
                      </Grid>
                      <Grid item ml={2}>
                        <MDBox height="100%" mt={0.5} lineHeight={1}>
                          <MDTypography variant="h6" fontWeight="medium">
                            {highestBidder?.bidder?.name}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <MDBox height="100%" mt={0.5} lineHeight={1}>
                      <MDTypography variant="h5" fontWeight="regular" color="text">
                        {"$" + highestBidder?.bidValue}
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <IconButton sx={navbarIconButton} size="small" disableRipple>
                          <Icon sx={iconsStyle}>place</Icon>
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <MDBox height="100%" mt={0.5} lineHeight={1}>
                          <MDTypography variant="h5" fontWeight="regular" color="text">
                            {highestBidder?.bidder?.country}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} md={6}>
                    <MDTypography>No Bid Yet</MDTypography>
                  </Grid>
                </>
              )}
              {isHost ? (
                <></>
              ) : (
                <>
                  <Grid item xs={12} mt={4}>
                    <MDTypography variant="h5" fontWeight="medium">
                      ADD YOUR BID
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} mt={1}>
                    <MDInput
                      required
                      type="text"
                      label="Bid"
                      name="bidPrice"
                      autoComplete="bidPrice"
                      value={bid}
                      onChange={(e) => setBid(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} mt={2}>
                    <MDButton color="dark" fullWidth onClick={handleAddBid}>
                      BID
                    </MDButton>
                  </Grid>
                </>
              )}
            </Grid>
            {isHost && selectedProduct?.status == "live" ? (
              <Grid item xs={12} mt={4}>
                <MDButton color="success" variant="contained" p={0} onClick={handleCompleteDeal}>
                  <MDTypography component="h5" variant="h6" color="text" m={-1}>
                    Complete Deal
                  </MDTypography>
                </MDButton>
              </Grid>
            ) : (
              <></>
            )}
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
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
export default connect(mapStoreStateToProps, mapActionsToProps)(BidPage);
