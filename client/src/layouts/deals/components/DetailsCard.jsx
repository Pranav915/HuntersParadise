/* eslint-disable react/prop-types */
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { connect } from "react-redux";
import { getDealActions } from "app/actions/dealActions";

const DetailsCard = ({ dealDetails }) => {
  return (
    <MDBox>
      <Card>
        <Grid container p={2}>
          <Grid item xs={12} md={3}>
            <img
              src={dealDetails?.productImage}
              alt="test"
              style={{ width: "250px", height: "300px" }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container pt={3}>
              <Grid item xs={12}>
                <MDTypography variant="h4" color="text">
                  {dealDetails?.productName}
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <MDTypography component="p" variant="button" color="text">
                  {dealDetails?.category}
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
                  {dealDetails?.dealDescription}
                </MDTypography>
              </Grid>
              <Grid item xs={12} mt={2.5}>
                <MDTypography variant="h5" color="text">
                  Asked Price
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <MDTypography component="p" variant="button" color="text">
                  {"$ " + dealDetails?.askPrice}
                </MDTypography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
};

const mapStoreStateToProps = ({ deal }) => {
  return {
    ...deal,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getDealActions(dispatch),
  };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(DetailsCard);
