/* eslint-disable react/prop-types */
import { Card, Grid, Icon, IconButton } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import React, { useState } from "react";
import { getAuctionActions } from "app/actions/auctionActions";
import { connect } from "react-redux";

const ProductDetails = ({ selectedProduct, isHost, startProduct, liveAuctionDetails }) => {
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

  const handleStartProduct = () => {
    const req = {
      auctionId: liveAuctionDetails?.auctionId,
      productName: selectedProduct?.product?.name,
    };
    console.log("req", req);
    startProduct(req);
  };
  return (
    <MDBox>
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
            <MDBox mt={2} sx={{ display: "flex", justifyContent: "center" }}>
              <img src={selectedProduct?.product?.image} alt="test" style={{ width: "60%" }} />
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

                {isHost && selectedProduct?.status == "pending" ? (
                  <Grid item xs={12} mt={4}>
                    <MDButton
                      color="success"
                      variant="contained"
                      p={0}
                      onClick={handleStartProduct}
                    >
                      <MDTypography component="h5" variant="h6" color="text" m={-1}>
                        Start Product
                      </MDTypography>
                    </MDButton>
                  </Grid>
                ) : (
                  <></>
                )}
                {selectedProduct?.status != "pending" ? (
                  <>
                    <Grid item xs={12} mt={3}>
                      <MDTypography variant="h5" fontWeight="medium">
                        {selectedProduct?.status == "sold" ? "Winner" : "Product Went Unsold!"}
                      </MDTypography>
                    </Grid>
                    {selectedProduct?.status == "sold" ? (
                      <>
                        <Grid item xs={12} md={6}>
                          <Grid container alignItems="center" p={1}>
                            <Grid item>
                              <MDAvatar
                                src={selectedProduct?.highestbid?.highestBidder?.profilePhoto}
                                alt="profile-image"
                                size="sm"
                                shadow="sm"
                              />
                            </Grid>
                            <Grid item ml={2}>
                              <MDBox height="100%" mt={0.5} lineHeight={1}>
                                <MDTypography variant="h6" fontWeight="medium">
                                  {selectedProduct?.highestbid?.highestBidder?.name}
                                </MDTypography>
                              </MDBox>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <MDBox height="100%" mt={0.5} lineHeight={1}>
                            <MDTypography variant="h5" fontWeight="regular" color="text">
                              {"$" + selectedProduct?.highestbid?.bidPrice}
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
                                  {selectedProduct?.highestbid?.highestBidder?.country}
                                </MDTypography>
                              </MDBox>
                            </Grid>
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </Grid>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </MDBox>
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
export default connect(mapStoreStateToProps, mapActionsToProps)(ProductDetails);
