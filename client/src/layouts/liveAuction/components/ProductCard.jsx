/* eslint-disable react/prop-types */
import { Card, CardActionArea, Grid, Icon } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

const ProductCard = ({ product, handleSetSelectedProduct }) => {
  return (
    <MDBox px={1}>
      <MDBox p={1}>
        <Card onClick={handleSetSelectedProduct}>
          <CardActionArea>
            <Grid container display="flex" alignItems="center" p={1} justifyContent="space-between">
              <Grid>
                <Grid item>
                  <MDAvatar
                    src={product?.product?.image}
                    alt="profile-image"
                    size="xl"
                    shadow="sm"
                  />
                </Grid>
                <Grid item ml={2}>
                  <MDBox height="100%" mt={0.5} lineHeight={1}>
                    <MDTypography variant="h6" fontWeight="medium">
                      {product?.product?.name}
                    </MDTypography>
                    <MDTypography component="p" variant="button" color="text">
                      {product?.startBid}
                    </MDTypography>
                  </MDBox>
                </Grid>
              </Grid>
              <Grid item>
                {product?.status == "live" ? (
                  <MDButton color="success" variant="outlined" p={0}>
                    <MDTypography component="h5" variant="h6" color="text" m={-1}>
                      Live
                    </MDTypography>
                  </MDButton>
                ) : (
                  <MDButton variant="outlined" p={0}>
                    <MDTypography component="h5" variant="h6" color="text" m={-1}>
                      Pending
                    </MDTypography>
                  </MDButton>
                )}
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      </MDBox>
    </MDBox>
  );
};

export default ProductCard;
