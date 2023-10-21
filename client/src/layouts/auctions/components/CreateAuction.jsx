import { Grid, IconButton, Paper, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import MDInput from "components/MDInput";
import dayjs from "dayjs";
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const { default: MDBox } = require("components/MDBox");

const CreateAuction = () => {
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  const [productList, setProductList] = useState([
    {
      name: "",
      startBid: "",
      category: "",
      description: "",
      selectedImage: null,
      imageUrl: "",
    },
  ]);

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...productList];
    updatedProducts[index][field] = value;
    setProductList(updatedProducts);
  };

  const handleProductImageSelect = (index, selectedImage) => {
    const updatedProducts = [...productList];
    updatedProducts[index].selectedImage = selectedImage;
    setProductList(updatedProducts);
  };

  const handleProductImageDeselect = (index) => {
    const updatedProducts = [...productList];
    updatedProducts[index].selectedImage = null;
    setProductList(updatedProducts);
  };

  const removeProduct = (index) => {
    const updatedProducts = [...productList];
    updatedProducts.splice(index, 1);
    setProductList(updatedProducts);
  };

  const addProduct = () => {
    setProductList([
      ...productList,
      {
        name: "",
        startBid: "",
        category: "",
        description: "",
        selectedImage: null,
        imageUrl: "",
      },
    ]);
  };

  const canAddProduct = productList.every((product) => product.name && product.selectedImage);

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = darkMode ? white.main : dark.main;

      if (transparentNavbar) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <MDBox sx={{ maxHeight: "550px", overflowY: "auto" }} mb={3}>
      <MDBox component="form" role="form" noValidate mx={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MDInput
              required
              type="text"
              label="Auction Title"
              name="auctionTitle"
              autoComplete="auctionTitle"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {productList.map((product, index) => (
              <MDBox
                key={index}
                sx={{
                  display: "flex",
                }}
              >
                <Grid container sx={{ border: "0.1px solid #C0C0C0", p: 2 }}>
                  <Grid item xs={12} md={7} sx={{ mr: 4 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <MDInput
                          required
                          type="text"
                          label="Product Name"
                          name="productName"
                          autoComplete="productName"
                          value={product.name}
                          onChange={(e) => {
                            handleProductChange(index, "name", e.target.value);
                          }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MDInput
                          required
                          type="text"
                          label="Start Bid"
                          name="startBid"
                          autoComplete="startBid"
                          value={product.startBid}
                          onChange={(e) => {
                            handleProductChange(index, "startBid", e.target.value);
                          }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MDInput
                          required
                          type="text"
                          label="Product Category"
                          name="productCategory"
                          autoComplete="productCategory"
                          value={product.productCategory}
                          onChange={(e) => {
                            handleProductChange(index, "productCategory", e.target.value);
                          }}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <input
                      accept="image/*"
                      id={`product-upload-${index}`}
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const selectedImage = e.target.files[0];
                        handleProductImageSelect(index, selectedImage);
                      }}
                    />
                    <label htmlFor={`product-upload-${index}`}>
                      <Paper
                        elevation={3}
                        style={{
                          padding: "15px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        component="div"
                      >
                        {product.selectedImage ? (
                          <div>
                            <img
                              src={URL.createObjectURL(product.selectedImage)}
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
                      value={product.description}
                      onChange={(e) => {
                        handleProductChange(index, "description", e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <IconButton
                  aria-label="remove"
                  onClick={() => removeProduct(index)}
                  sx={navbarIconButton}
                >
                  <RemoveIcon sx={iconsStyle} />
                </IconButton>
              </MDBox>
            ))}
            <IconButton
              aria-label="add"
              sx={navbarIconButton}
              onClick={addProduct}
              disabled={!canAddProduct}
            >
              <AddIcon sx={iconsStyle} />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
                <DateTimePicker
                  label="Auction Start Details"
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
};

export default CreateAuction;
