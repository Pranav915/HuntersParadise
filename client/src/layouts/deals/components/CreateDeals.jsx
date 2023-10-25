/* eslint-disable react/prop-types */
import { Grid, IconButton, Paper, TextField } from "@mui/material";

import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import MDInput from "components/MDInput";
import dayjs from "dayjs";
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import createDeal from "layouts/deal/createDeal";
import { getDealActions } from "app/actions/dealActions";
import { connect } from "react-redux";
import MDButton from "components/MDButton";
import { useChannel } from "ably/react";

const { default: MDBox } = require("components/MDBox");

const CreateDeal = ({ createDeal, handleClose }) => {
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState("");
  const { channel } = useChannel(`dealChannel:${productCategory}`, (message) => {
    console.log(message);
  });

  const handleProductImageSelect = (productImage) => {
    setProductImage(productImage);
  };

  const handleProductImageDeselect = (index) => {
    setProductImage(null);
  };

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = darkMode ? white.main : dark.main;

      if (transparentNavbar) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dealData = {
      productName: data.get("productName"),
      askPrice: data.get("askPrice"),
      category: productCategory,
      productImage: data.get("productImage"),
      description: data.get("description"),
    };
    console.log("dealDetails", dealData);
    console.log("channel", channel);
    channel.publish("createDeal", JSON.stringify(dealData));
    handleClose();
  };

  return (
    <MDBox sx={{ maxHeight: "550px", overflowY: "auto" }} mb={3}>
      <MDBox component="form" role="form" noValidate mx={5} onSubmit={handleSubmit}>
        <MDBox
          sx={{
            display: "flex",
          }}
        >
          <Grid item xs={12} md={7} sx={{ mr: 4 }}>
            <Grid container spacing={1}>
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
                  type="text"
                  label="Ask Price"
                  name="askPrice"
                  autoComplete="askPrice"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <MDInput
                  required
                  type="text"
                  label="Product Category"
                  value={productCategory}
                  onChange={(e) => {
                    setProductCategory(e.target.value);
                  }}
                  name="productCategory"
                  autoComplete="productCategory"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <input
              accept="image/*"
              id={`product-upload`}
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                const productImage = e.target.files[0];
                handleProductImageSelect(productImage);
              }}
            />
            <label htmlFor={`product-upload`}>
              <Paper
                elevation={3}
                style={{
                  padding: "15px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                component="div"
              >
                {productImage ? (
                  <div>
                    <img
                      src={URL.createObjectURL(productImage)}
                      alt="Product"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "80px",
                      }}
                    />
                    <br />
                    <IconButton
                      color="error"
                      aria-label="Deselect"
                      onClick={() => handleProductImageDeselect(index)}
                      sx={{ navbarIconButton }}
                    >
                      <CancelIcon sx={{ iconsStyle }} />
                    </IconButton>
                  </div>
                ) : (
                  <MDTypography variant="body1" color="black">
                    Select an Product Image
                  </MDTypography>
                )}
              </Paper>
            </label>
          </Grid>
        </MDBox>
        <Grid item xs={12} md={12} mt={2}>
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            id="description"
            label="Description"
            type="text"
            name="description"
            autoComplete="Description"
          />
        </Grid>
        <MDBox sx={{ display: "flex", justifyContent: "right" }} mx={5} my={2}>
          <MDButton color="dark" variant="gradient" type="submit">
            Submit
          </MDButton>
        </MDBox>
      </MDBox>
    </MDBox>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getDealActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(CreateDeal);
