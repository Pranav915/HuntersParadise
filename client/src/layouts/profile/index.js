/* eslint-disable react/prop-types */
// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Code Pulse React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Code Pulse React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { getAuthActions } from "app/actions/authActions";
import { connect } from "react-redux";

const Overview = ({ userDetails }) => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header userDetails={userDetails}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description="A tech enthusiast, nature lover, and avid reader. Seeking meaningful connections and passionate about creativity and problem-solving. Let's connect and explore together!"
                info={{
                  fullName: userDetails?.name,
                  mobile: userDetails?.phoneNumber,
                  email: userDetails?.email,
                  location: userDetails?.country,
                }}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
};

const mapStoreStateToProps = ({ deal, auth }) => {
  return {
    ...auth,
  };
};

const mapActionsToProps = (dispatch) => {
  return {};
};
export default connect(mapStoreStateToProps, mapActionsToProps)(Overview);
