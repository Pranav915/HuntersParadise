import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import DetailsCard from "./components/DetailsCard";

const AuctionDetails = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MDBox>
              <MDTypography variant="h4" color="white">
                Auction Name
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <DetailsCard />
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
                        Host Name
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
                      12:00:00
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} mt={2.5}>
                    <MDTypography variant="h5" color="text">
                      Number of Participants
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12}>
                    <MDTypography component="p" variant="button" color="text">
                      100
                    </MDTypography>
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

export default AuctionDetails;
