/* eslint-disable react/prop-types */

// @mui material components
import Card from "@mui/material/Card";

// Code Pulse React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

import { getActions } from "app/actions/alertActions";
import { getAuthActions } from "app/actions/authActions";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = ({ passwordReset, openAlertMessage }) => {
  const navigate = useNavigate();
  const search = useLocation().search;

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    if (data.get("password") !== data.get("confirmPassword")) {
      openAlertMessage("Passwords don't Match!");
    } else {
      const userId = new URLSearchParams(search).get("id");
      const token = new URLSearchParams(search).get("token");
      const userDetails = {
        userId: userId,
        token: token,
        password: data.get("password"),
      };
      passwordReset(userDetails, navigate);
    }
  };

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" name="password" fullWidth />
            </MDBox>
            <MDBox>
              <MDInput type="password" label="Confirm Password" name="confirmPassword" fullWidth />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" type="submit" color="info" fullWidth>
                reset
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getAuthActions(dispatch),
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(ResetPassword);
