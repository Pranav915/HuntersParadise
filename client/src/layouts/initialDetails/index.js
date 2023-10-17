/* eslint-disable react/prop-types */

import { Button, Card, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMainActions } from "app/actions/mainActions";
import BasicLayout from "layouts/authentication/components/BasicLayout";

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

const InitialDetails = ({ addInitialDetails }) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userDetails = {
      age: data.get("age"),
      country: data.get("country"),
    };
    addInitialDetails(userDetails, navigate);
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox pt={4} pb={3} px={3} textAlign="center">
          <MDTypography variant="h5" fontWeight="medium" mt={1}>
            Please Fill Your Details
          </MDTypography>
          <MDBox component="form" role="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MDInput
                  required
                  type="number"
                  label="Age"
                  name="age"
                  autoComplete="age"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <MDInput
                  required
                  label="Your Country"
                  type="text"
                  name="country"
                  autoComplete="country"
                  fullWidth
                />
              </Grid>
            </Grid>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" type="submit" color="info" fullWidth>
                Submit Details
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getMainActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(InitialDetails);
