/* eslint-disable react/prop-types */

import { Autocomplete, Card, Checkbox, Grid, Paper, TextField } from "@mui/material";
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
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    age: null,
    phone: null,
    country: "",
  });

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleProfileImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedProfileImage({
          file,
          previewUrl: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImagesToCloudinary = async () => {
    if (selectedProfileImage.file) {
      const data = new FormData();
      data.append("file", selectedProfileImage.file);
      data.append("upload_preset", "codepulse");
      data.append("cloud_name", "harshit9829");

      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/harshit9829/image/upload", {
          method: "POST",
          body: data,
        });

        if (response.ok) {
          const imageData = await response.json();
          setProfileUrl(imageData.url);
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
    if (profileUrl !== "") {
      const userDetails = {
        name: userData.name,
        phoneNumber: userData.phone,
        age: userData.age,
        country: userData.country,
        profileImage: profileUrl,
        subscribedCategories: categories,
      };
      console.log("userDetails", userDetails);
      addInitialDetails(userDetails, navigate);
    }
  }, [profileUrl]);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox pt={4} pb={3} px={3} textAlign="center">
          <MDTypography variant="h5" fontWeight="medium" mt={1}>
            Please Fill Your Details
          </MDTypography>
          <MDBox component="form" role="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <input
                  accept="image/*"
                  id="movie-poster-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleProfileImageSelect}
                />
                <label htmlFor="movie-poster-upload">
                  <Paper
                    elevation={3}
                    style={{
                      textAlign: "center",
                      cursor: "pointer",
                      width: "100px",
                      height: "100px",
                      borderRadius: "51%",
                    }}
                    component="div"
                  >
                    {selectedProfileImage ? (
                      <MDBox>
                        <img
                          src={selectedProfileImage.previewUrl}
                          alt="User Profile"
                          style={{ width: "100px", height: "100px", borderRadius: "51%" }}
                        />
                      </MDBox>
                    ) : (
                      <MDTypography
                        variant="button"
                        color="black"
                        sx={{ display: "flex", justifyContent: "center", paddingTop: "28px" }}
                      >
                        Select Profile Picture
                      </MDTypography>
                    )}
                  </Paper>
                </label>
              </Grid>
              <Grid item xs={12}>
                <MDInput
                  required
                  type="text"
                  label="Full Name"
                  name="fullName"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      name: e.target.value,
                    })
                  }
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
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        phone: e.target.value,
                      })
                    }
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
                    value={userData.age}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        age: e.target.value,
                      })
                    }
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
                  value={userData.country}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      country: e.target.value,
                    })
                  }
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
