import { Card, Grid, Icon } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

const ProductCard = () => {
  return (
    <MDBox px={1}>
      <MDBox p={1}>
        <Card>
          <Grid container alignItems="center" p={1} justifyContent="space-between">
            <Grid item>
              <MDAvatar
                src="https://source.unsplash.com/random"
                alt="profile-image"
                size="xl"
                shadow="sm"
              />
            </Grid>
            <Grid item ml={2}>
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <MDTypography variant="h6" fontWeight="medium">
                  Addidas
                </MDTypography>
                <MDTypography component="p" variant="button" color="text">
                  $5000
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item ml={2}>
              <MDButton color="success" variant="outlined" p={0}>
                <MDTypography component="h5" variant="h6" color="text" m={-1}>
                  Live
                </MDTypography>
              </MDButton>
            </Grid>
          </Grid>
        </Card>
      </MDBox>
    </MDBox>
  );
};

export default ProductCard;
