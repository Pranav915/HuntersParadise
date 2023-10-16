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
import { useState } from "react";
import { validateMail } from "shared/utils/validators";

const ForgotPassword = ({ requestPasswordReset, openAlertMessage }) => {
  const [mailStatus, setMailStatus] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userDetails = {
      email: data.get("email"),
    };
    if (validateMail(data.get("email"))) {
      requestPasswordReset(userDetails, setMailStatus);
    } else {
      openAlertMessage("Please enter a valid email.");
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
            Forgot Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail in maximum 60 seconds
          </MDTypography>
        </MDBox>
        {mailStatus ? (
          <MDTypography variant="h5" color="white" my={1}>
            Password Reset Link has been sent to the given email id.
          </MDTypography>
        ) : (
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form" onSubmit={handleSubmit}>
              <MDBox mb={4}>
                <MDInput type="email" label="Email" name="email" variant="standard" fullWidth />
              </MDBox>
              <MDBox mt={6} mb={1}>
                <MDButton variant="gradient" type="submit" color="info" fullWidth>
                  reset
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        )}
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
export default connect(null, mapActionsToProps)(ForgotPassword);
