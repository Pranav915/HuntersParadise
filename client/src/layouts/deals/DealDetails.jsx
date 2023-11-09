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
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getDealActions } from "app/actions/dealActions";
import DealUsers from "./data/DealUsers";
import { useChannel } from "ably/react";

const DealDetails = ({ submitOffer, userDetails, getDealDetails }) => {
  const navigate = useNavigate();
  const [offeredPrice, setOfferedPrice] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [dealDetails, setDealDetails] = useState(null);
  const [userType, setUserType] = useState("");
  const [opt, setopt] = useState("create");
  const [offer, setOffer] = useState(null);

  const { columns, rows } = DealUsers(dealDetails);

  const location = useLocation();

  const handleDealAccepted = () => {
    navigate("/deals");
  };
  const comChannel = useChannel("communicationChannel:" + userDetails?.userId, (message) => {
    getDealDetails(dealDetails?.dealDetails?._id, setDealDetails);
    if (message.name == "GotIt") {
      handleDealAccepted();
    }
  }).channel;

  const handleSubmitOffer = () => {
    let offerDetails;
    if (opt == "edit") {
      offerDetails = {
        offerId: offer._id,
        newPrice: offeredPrice,
        opt: opt,
      };
    } else {
      offerDetails = {
        deal: dealDetails?.dealDetails?._id,
        sellerName: dealDetails?.dealDetails.sellerName,
        offered_by: userDetails?.userId,
        offered_by_name: userDetails?.username,
        offeredPrice: offeredPrice,
        askedPrice: dealDetails?.dealDetails?.askPrice,
        opt: opt,
      };
    }

    console.log("offerDetails", offerDetails);
    submitOffer(offerDetails, setShowEdit, setOffer);
    setopt("edit");
  };

  useEffect(() => {
    setUserType(location.state.data.sender);
    getDealDetails(location.state.data.deal._id, setDealDetails);
  }, []);

  useEffect(() => {
    if (dealDetails?.offer) {
      setShowEdit(true);
      setopt("edit");
      setOfferedPrice(dealDetails?.dealDetails?.offers[0]?.offer?.offeredPrice);
      setOffer(dealDetails?.dealDetails?.offers[0]?.offer);
    }
  }, [dealDetails, setDealDetails]);

  useEffect(() => {
    if (dealDetails?.offer) {
      setOfferedPrice(offer?.offeredPrice);
    }
  }, [offer, setOffer]);

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
                    <Grid item xs={12} sx={{ display: showEdit ? "auto" : "none" }}>
                      <MDTypography component="h5" variant="h5" color="text">
                        {offeredPrice}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: showEdit ? "none" : "auto" }}>
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
                      {showEdit ? (
                        <>
                          <MDButton
                            color="dark"
                            variant="gradient"
                            onClick={() => setShowEdit(false)}
                          >
                            <Icon>edit</Icon>
                            <MDTypography component="h5" variant="h6" color="text" ml={1}>
                              Edit
                            </MDTypography>
                          </MDButton>
                        </>
                      ) : (
                        <MDButton color="dark" variant="gradient" onClick={handleSubmitOffer}>
                          <Icon>login</Icon>
                          <MDTypography component="h5" variant="h6" color="text" ml={1}>
                            Submit
                          </MDTypography>
                        </MDButton>
                      )}
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
