import { Card, Grid, Icon, IconButton } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import { useState } from "react";

const BidPage = () => {
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
    <Card>
      <MDBox p={2}>
        <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          <MDTypography variant="h4" color="text">
            Time Left
          </MDTypography>
        </MDBox>
        <MDBox
          sx={{
            overflowY: "auto",
            maxHeight: "590px",
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
              src="https://source.unsplash.com/random"
              alt="test"
              style={{ width: "100%", height: "350px" }}
            />
          </MDBox>
          <MDBox mt={2}>
            <Grid container p={1}>
              <Grid item xs={12}>
                <MDTypography variant="h5" fontWeight="medium">
                  TOP BIDDER
                </MDTypography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container alignItems="center" p={1}>
                  <Grid item>
                    <MDAvatar
                      src="https://source.unsplash.com/random"
                      alt="profile-image"
                      size="sm"
                      shadow="sm"
                    />
                  </Grid>
                  <Grid item ml={2}>
                    <MDBox height="100%" mt={0.5} lineHeight={1}>
                      <MDTypography variant="h6" fontWeight="medium">
                        Harshit Pachar
                      </MDTypography>
                    </MDBox>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3}>
                <MDBox height="100%" mt={0.5} lineHeight={1}>
                  <MDTypography variant="h5" fontWeight="regular" color="text">
                    $5000
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
                        Maharashtra
                      </MDTypography>
                    </MDBox>
                  </Grid>
                </Grid>
              </Grid>
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
                <MDButton color="dark" fullWidth>
                  BID
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
};

export default BidPage;
