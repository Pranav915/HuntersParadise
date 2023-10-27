/* eslint-disable react/prop-types */
import { Card, CardContent, CardMedia, Grid, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

import DetailsCard from "./components/DetailsCard";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { getDealActions } from "app/actions/dealActions";
import DealUsers from "./data/DealUsers";

const DealDetails = ({ submitOffer, userDetails, getDealDetails }) => {
  const [offeredPrice, setOfferedPrice] = useState("");
  const [showEdit, setShowEdit] = useState(true);
  const [dealDetails, setDealDetails] = useState(null);
  const [userType, setUserType] = useState("");

  const { columns, rows } = DealUsers(dealDetails);

  const location = useLocation();

  const handleSubmitOffer = () => {
    const offerDetails = {
      deal: dealDetails?._id,
      sellerName: dealDetails?.sellerName,
      offered_by: userDetails?.userId,
      offered_by_name: userDetails?.username,
      offeredPrice: offeredPrice,
      askedPrice: dealDetails?.askPrice,
    };
    submitOffer(offerDetails, setShowEdit, setOfferedPrice);
  };

  useEffect(() => {
    // console.log("location.state.data", location.state.data);
    // setDealDetails(location.state.data.deal);
    setUserType(location.state.data.sender);
    getDealDetails(location.state.data.deal._id, setDealDetails);
  }, []);

  useEffect(() => {
    if (dealDetails?.dealDetails?.offers.length != 0) {
      setShowEdit(true);
    }
  }, [dealDetails, setDealDetails]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <DetailsCard dealDetails={dealDetails?.dealDetails} />
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
                      image={dealDetails?.dealDetails?.seller.profilePhoto}
                      sx={{ width: "250px" }}
                    />
                    <CardContent>
                      <MDTypography variant="h4" align="center" pt={1}>
                        {dealDetails?.dealDetails?.sellerName}
                      </MDTypography>
                    </CardContent>
                  </MDBox>
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                {!dealDetails?.isSeller ? (
                  <Grid container spacing={2} p={5} pl={10}>
                    <Grid item xs={12} mt={2.5}>
                      <MDTypography variant="h4" color="text">
                        Your Offered Price
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: showEdit ? "none" : "auto" }}>
                      <MDTypography component="h5" variant="h5" color="text">
                        {offeredPrice}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: showEdit ? "auto" : "none" }}>
                      <MDInput
                        required
                        type="text"
                        label="Add Your Offer"
                        name="offeredPrice"
                        value={offeredPrice}
                        onChange={(e) => setOfferedPrice(e.target.value)}
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
                ) : (
                  <MDBox ml={5} width="80%">
                    <DataTable
                      table={{ columns, rows }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                  </MDBox>
                )}
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
