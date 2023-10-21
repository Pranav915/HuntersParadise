/* eslint-disable react/prop-types */

import { Button, Card, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDealActions } from "app/actions/dealActions";
import BasicLayout from "layouts/authentication/components/BasicLayout";

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useChannel } from "ably/react";

const CreateDeal = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const { channel } = useChannel(`dealChannel:${category}`, (message) => {
    // console.log(message);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("category", category);
    const dealData = {
      productName: data.get("productName"),
      productImage: data.get("productImage"),
      category: data.get("category"),
      dealDescription: data.get("productDescription"),
      askPrice: data.get("askPrice"),
      seller: data.get("seller"),
      sellerName: data.get("sellerName"),
    };
    console.log("dealData", channel);
    channel.publish("createDeal", JSON.stringify(dealData));
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox pt={4} pb={3} px={3} textAlign="center">
          <MDTypography variant="h5" fontWeight="medium" mt={1}>
            Please Fill Your Details
          </MDTypography>
          <MDBox component="form" role="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MDInput
                  required
                  type="text"
                  label="Product Name"
                  name="productName"
                  autoComplete="productName"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <MDInput
                  required
                  label="Product Description"
                  type="text"
                  name="productDescription"
                  autoComplete="productDescription"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <MDInput
                  required
                  label="Deal Category"
                  type="text"
                  name="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  autoComplete="category"
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
    ...getDealActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(CreateDeal);
