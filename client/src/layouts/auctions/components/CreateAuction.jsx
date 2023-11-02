/* eslint-disable react/prop-types */
import { Grid, IconButton, Paper, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import MDInput from "components/MDInput";
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { getAuctionActions } from "app/actions/auctionActions";
import { connect } from "react-redux";
import MDButton from "components/MDButton";
import { authActions } from "app/actions/authActions";

const { default: MDBox } = require("components/MDBox");

const CreateAuction = ({ createAuction, handleClose }) => {
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  const [auctionName, setAuctionName] = useState("");
  const [auctionDescription, setAuctionDescription] = useState("");
  const [productList, setProductList] = useState([
    {
      name: "",
      startBid: "",
      description: "",
      selectedImage: null,
      imageUrl: "",
    },
  ]);
  const [startTime, setStartTime] = useState("");

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

  const uploadImagesAndSetUrls = async () => {
    const updatedProductList = await Promise.all(
      productList.map(async (product) => {
        if (product.selectedImage) {
          const data = new FormData();
          data.append("file", product.selectedImage);
          data.append("upload_preset", "codepulse");
          data.append("cloud_name", "harshit9829");

          try {
            const response = await fetch(
              "https://api.cloudinary.com/v1_1/harshit9829/image/upload",
              {
                method: "POST",
                body: data,
              }
            );
            console.log(response);

            if (response.ok) {
              const imageData = await response.json();
              product.imageUrl = imageData.url;
            } else {
              console.error("Image upload failed for product:", product.name);
            }
          } catch (error) {
            console.error("Error uploading image for product:", product.name, error);
          }
        }
        return product;
      })
    );
    setProductList(updatedProductList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    uploadImagesAndSetUrls();
  };

  useEffect(() => {
    const allUrlsPresent = productList.every((product) => product.imageUrl);

    if (allUrlsPresent) {
      let tempProductList = [];
      productList.map((product) => {
        let tempProduct = {
          product: {
            name: product.name,
            description: product.description,
            image: product.imageUrl,
          },
          startBid: product.startBid,
        };
        tempProductList.push(tempProduct);
      });
      const auctionDetails = {
        auctionTitle: auctionName,
        auctionDescription: auctionDescription,
        productList: tempProductList,
        startTime: startTime,
      };
      console.log("auctionDetails", auctionDetails);
      createAuction(auctionDetails);
      handleClose();
    }
  }, [productList]);

  return (
    <MDBox sx={{ maxHeight: "550px", overflowY: "auto" }} mb={3}>
      <MDBox component="form" role="form" mx={5} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MDInput
              required
              type="text"
              label="Auction Title"
              name="auctionTitle"
              value={auctionName}
              onChange={(e) => setAuctionName(e.target.value)}
              autoComplete="auctionTitle"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              id="description"
              label="Description"
              type="text"
              name="auctionDescription"
              value={auctionDescription}
              onChange={(e) => setAuctionDescription(e.target.value)}
              autoComplete="Description"
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
                <Grid container sx={{ border: "0.1px solid #C0C0C0", p: 2 }} mb={2}>
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
                  label="Auction Start Date & Time"
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  value={startTime}
                  onChange={(value) => setStartTime(value)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
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
    ...getAuctionActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(CreateAuction);
