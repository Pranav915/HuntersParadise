/* eslint-disable react/prop-types */
import { Autocomplete, Checkbox, Grid, IconButton, Paper, TextField } from "@mui/material";

import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import MDInput from "components/MDInput";
import dayjs from "dayjs";
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { getDealActions } from "app/actions/dealActions";
import { connect } from "react-redux";
import MDButton from "components/MDButton";
import { useChannel } from "ably/react";

const { default: MDBox } = require("components/MDBox");

const categories = [
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

const CreateDeal = ({ userDetails, handleClose }) => {
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  const [productImage, setProductImage] = useState(null);
  const [productImageUrl, setPoductImageUrl] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productData, setProductData] = useState({
    productName: "",
    askPrice: null,
    description: "",
  });
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

  const uploadImagesToCloudinary = async () => {
    if (productImage) {
      const data = new FormData();
      data.append("file", productImage);
      data.append("upload_preset", "codepulse");
      data.append("cloud_name", "harshit9829");

      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/harshit9829/image/upload", {
          method: "POST",
          body: data,
        });

        if (response.ok) {
          const imageData = await response.json();
          setPoductImageUrl(imageData.url);
        } else {
          console.error("Image upload failed");
          return;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await uploadImagesToCloudinary();
  };

  useEffect(() => {
    if (productImageUrl !== "") {
      const dealData = {
        productName: productData.productName,
        askPrice: productData.askPrice,
        category: productCategory,
        productImage: productImageUrl,
        description: productData.description,
        seller: userDetails.userId,
        sellerName: userDetails.username,
      };
      console.log("dealDetails", dealData);
      channel.publish("createDeal", JSON.stringify(dealData));
      handleClose();
    }
  }, [productImageUrl]);

  return (
    <MDBox sx={{ maxHeight: "550px", overflowY: "auto" }} mb={3}>
      <MDBox component="form" role="form" mx={5} onSubmit={handleSubmit}>
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
                  value={productData.productName}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      productName: e.target.value,
                    })
                  }
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
                  value={productData.askPrice}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      askPrice: e.target.value,
                    })
                  }
                  autoComplete="askPrice"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  id="categories"
                  disableCloseOnSelect
                  limitTags={2}
                  options={categories}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => <li {...props}>{option}</li>}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Subscribe your favourite categories"
                      placeholder="Favorites"
                    />
                  )}
                  value={productCategory}
                  onChange={(event, newValue) => {
                    setProductCategory(newValue);
                  }}
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
            value={productData.description}
            onChange={(e) =>
              setProductData({
                ...productData,
                description: e.target.value,
              })
            }
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

const mapStoreStateToProps = ({ deal, auth }) => {
  return {
    ...deal,
    ...auth,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getDealActions(dispatch),
  };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(CreateDeal);
