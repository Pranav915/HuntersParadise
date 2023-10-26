import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const DetailsCard = () => {
  return (
    <MDBox>
      <Card>
        <Grid container p={2}>
          <Grid item xs={12} md={3}>
            <img
              src="https://source.unsplash.com/random/200x200?sig=1"
              alt="test"
              style={{ width: "250px", height: "300px" }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container pt={3}>
              <Grid item xs={12}>
                <MDTypography variant="h4" color="text">
                  Product Name
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <MDTypography component="p" variant="button" color="text">
                  Product category
                </MDTypography>
              </Grid>
              <Grid item xs={12} mt={2.5}>
                <MDTypography variant="h5" color="text">
                  Overview
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <MDTypography
                  component="p"
                  variant="button"
                  color="text"
                  sx={{ textAlign: "justify" }}
                >
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus.
                </MDTypography>
              </Grid>
              <Grid item xs={12} mt={2.5}>
                <MDTypography variant="h5" color="text">
                  Asked Price
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <MDTypography component="p" variant="button" color="text">
                  $5000
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
