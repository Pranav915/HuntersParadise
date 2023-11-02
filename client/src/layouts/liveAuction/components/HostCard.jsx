/* eslint-disable react/prop-types */
import { Card, Grid } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { getAuctionActions } from "app/actions/auctionActions";
import { connect } from "react-redux";

const HostCard = ({ data, isHost, endAuction }) => {
  const handleEndAuction = () => {
    endAuction({ auctionId: data?.auctionId });
  };
  console.log("data", data);
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
          {/* <MDTypography
            component="p"
            variant="button"
            color="text"
            sx={{ textAlign: "justify" }}
            p={1}
          >
            {data?.auctionDescription}
          </MDTypography> */}
          {isHost ? (
            <MDButton color="error" fullWidth onClick={handleEndAuction}>
              End Auction
            </MDButton>
          ) : (
            <></>
          )}
        </MDBox>
      </MDBox>
    </Card>
  );
};

const mapStoreStateToProps = ({ auth, auction }) => {
  return {
    ...auction,
    ...auth,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getAuctionActions(dispatch),
  };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(HostCard);
