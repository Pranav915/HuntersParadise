/* eslint-disable react/prop-types */
import { Card, CardActionArea, Grid, Icon } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

const ProductCard = ({ product, handleSetSelectedProduct, status }) => {
  return (
    <MDBox px={1}>
      <MDBox p={1}>
        <Card onClick={handleSetSelectedProduct}>
          <CardActionArea>
            <Grid container p={1}>
              <Grid item>
                <MDAvatar src={product?.product?.image} alt="profile-image" size="xl" shadow="sm" />
              </Grid>
              <Grid item ml={2}>
                <MDBox height="100%" mt={0.5} lineHeight={1}>
                  <MDTypography
                    variant="h6"
                    fontWeight="medium"
                    sx={{
                      whiteSpace: "pre-wrap",
                      maxWidth: "200px",
                    }}
                  >
                    {product?.product?.name}
                  </MDTypography>
                  <MDTypography component="p" variant="button" color="text">
                    {product?.startBid}
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "right" }}>
                {product?.status == "live" ? (
                  <MDBadge badgeContent="Live" color="success" variant="gradient" size="sm" />
                ) : (
                  <MDBadge badgeContent="Pending" color="secondary" variant="gradient" size="sm" />
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
