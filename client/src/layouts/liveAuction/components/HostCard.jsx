/* eslint-disable react/prop-types */
import { Card, Grid } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const HostCard = ({ data }) => {
  return (
    <Card>
      <MDBox p={1}>
        <MDBox pl={1}>
          <MDTypography variant="h4" color="text">
            {data?.auctionTitle}
          </MDTypography>
        </MDBox>
        <MDBox p={1}>
          <Card>
            <Grid container alignItems="center" p={1}>
              <Grid item>
                <MDAvatar
                  src={data?.auctionHost?.profilePhoto}
                  alt="profile-image"
                  size="xl"
                  shadow="sm"
                />
              </Grid>
              <Grid item ml={2}>
                <MDBox height="100%" mt={0.5} lineHeight={1}>
                  <MDTypography variant="h5" fontWeight="medium">
                    {data?.auctionHost?.name}
                  </MDTypography>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    Host
                  </MDTypography>
                </MDBox>
              </Grid>
            </Grid>
          </Card>
        </MDBox>
        <MDBox>
          <MDTypography
            component="p"
            variant="button"
            color="text"
            sx={{ textAlign: "justify" }}
            p={1}
          >
            {data?.auctionDescription}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
};

export default HostCard;
