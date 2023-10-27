/* eslint-disable react/prop-types */
import { Card, CardContent, CardMedia, Grid, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import DetailsCard from "./components/DetailsCard";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { getDealActions } from "app/actions/dealActions";

const DealDetails = ({ submitOffer, userDetails }) => {
  const [price, setPrice] = useState("");
  const [showEdit, setShowEdit] = useState(true);
  const [dealDetails, setDealDetails] = useState(null);
  const location = useLocation();

  const handleSubmitOffer = () => {
    const offerDetails = {
      deal: dealDetails?._id,
      sellerName: dealDetails?.sellerName,
      offered_by: userDetails?.userId,
      offered_by_name: userDetails?.username,
      offeredPrice: price,
      askedPrice: dealDetails?.askPrice,
    };
    // console.log("offer", offer);
    submitOffer(offerDetails, setShowEdit);
  };

  useEffect(() => {
    console.log("location.state.data", location.state.data);
    setDealDetails(location.state.data);
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <DetailsCard dealDetails={dealDetails} />
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
                      image="https://source.unsplash.com/random"
                      sx={{ width: "250px" }}
                    />
                    <CardContent>
                      <MDTypography variant="h4" align="center" pt={1}>
                        {dealDetails?.sellerName}
                      </MDTypography>
                    </CardContent>
                  </MDBox>
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2} p={5} pl={10}>
                  <Grid item xs={12} mt={2.5}>
                    <MDTypography variant="h4" color="text">
                      Your Offered Price
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sx={{ display: showEdit ? "none" : "auto" }}>
                    <MDTypography component="h5" variant="h5" color="text">
                      {price}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sx={{ display: showEdit ? "auto" : "none" }}>
                    <MDInput
                      required
                      type="text"
                      label="Add Your Offer"
                      name="offeredPrice"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      autoComplete="offeredPrice"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDButton color="dark" variant="gradient" onClick={handleSubmitOffer}>
                      <Icon sx={{ display: showEdit ? "none" : "auto" }}>edit</Icon>
                      <Icon sx={{ display: showEdit ? "auto" : "none" }}>login</Icon>
                      <MDTypography
                        component="h5"
                        variant="h6"
                        color="text"
                        ml={1}
                        sx={{ display: showEdit ? "auto" : "none" }}
                      >
                        Submit
                      </MDTypography>
                      <MDTypography
                        component="h5"
                        variant="h6"
                        color="text"
                        ml={1}
                        sx={{ display: showEdit ? "none" : "auto" }}
                      >
                        Edit
                      </MDTypography>
                    </MDButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

const mapStoreStateToProps = ({ deal, auth }) => {
  return {
    ...deal,
    ...auth,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getDealActions(dispatch),
  };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(DealDetails);
