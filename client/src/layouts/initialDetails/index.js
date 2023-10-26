/* eslint-disable react/prop-types */

import {
  Autocomplete,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@mui/material";
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
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const topFilms = [
  "Art",
  "Jewelry",
  "Automobiles",
  "Books",
  "Coins",
  "Stamps",
  "Sports",
  "Firearms",
  "Instruments",
  "Culture",
  "Technology",
];

const InitialDetails = ({ addInitialDetails }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userDetails = {
      name: data.get("fullName"),
      phoneNumber: data.get("phoneNumber"),
      age: data.get("age"),
      country: data.get("country"),
      subscribedCategories: categories,
    };
    console.log("userDetails", userDetails);
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
                  type="text"
                  label="Full Name"
                  name="fullName"
                  autoComplete="fullName"
                  fullWidth
                />
              </Grid>
              <Grid item display="flex">
                <Grid item xs={12} mr="10px">
                  <MDInput
                    required
                    type="number"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} ml="10px">
                  <MDInput
                    required
                    type="number"
                    label="Age"
                    name="age"
                    autoComplete="age"
                    fullWidth
                  />
                </Grid>
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
              <Grid item xs={12}>
                <Autocomplete
                  id="categories"
                  multiple
                  disableCloseOnSelect
                  limitTags={2}
                  options={topFilms}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Subscribe your favourite categories"
                      placeholder="Favorites"
                    />
                  )}
                  value={categories}
                  onChange={(event, newValue) => {
                    setCategories(newValue);
                  }}
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
