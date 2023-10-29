/* eslint-disable react/prop-types */
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const DetailsCard = ({ product }) => {
  return (
    <MDBox>
      <Card>
        <Grid container p={2}>
          <Grid item xs={12} md={5}>
            <img
              src={product?.product?.image}
              alt="test"
              style={{ width: "200px", height: "250px" }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container pt={1}>
              <Grid item xs={12}>
                <MDTypography variant="h4" color="text">
                  {product?.product?.name}
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
                  {product?.product?.description}
                </MDTypography>
              </Grid>
              <Grid item xs={12} mt={2.5}>
                <MDTypography variant="h5" color="text">
                  Start Bid
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <MDTypography component="p" variant="button" color="text">
                  {"$" + product?.startBid}
                </MDTypography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
};

export default DetailsCard;
