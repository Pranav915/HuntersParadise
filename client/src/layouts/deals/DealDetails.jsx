import { Card, CardContent, CardMedia, Grid, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import DetailsCard from "./components/DetailsCard";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useState } from "react";

const DealDetails = () => {
  const [price, setPrice] = useState("$5000");
  const [showEdit, setShowEdit] = useState(false);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={4}>
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
                        Seller Name
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
                      label="Offer"
                      name="offeredPrice"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      autoComplete="offeredPrice"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDButton
                      color="dark"
                      variant="gradient"
                      onClick={() => setShowEdit(!showEdit)}
                    >
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

export default DealDetails;