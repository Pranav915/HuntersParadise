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

const ProductDetails = ({ selectedProduct }) => {
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
  return (
    <>
      <Card>
        <MDBox p={2}>
          <MDBox sx={{ display: "flex", justifyContent: "center" }}>
            <MDTypography variant="h4" color="text">
              {selectedProduct?.product?.name}
            </MDTypography>
          </MDBox>
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
              <Grid item xs={12} mt={4}>
                <MDTypography variant="h5" fontWeight="medium">
                  Add your comment
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
                <MDButton color="dark" fullWidth>
                  BID
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </Card>
    </>
  );
};

export default ProductDetails;
