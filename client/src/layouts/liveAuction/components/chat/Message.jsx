/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import { useChannel } from "ably/react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";
import { connect } from "react-redux";

const Message = ({ name, msg, userDetails }) => {
  return (
    <>
      <Card
        style={{
          display: "inline-block",
          maxWidth: "fit-content",
          padding: "5px 8px",
          marginBottom: "2px",
          alignSelf: userDetails?.name == name ? "flex-end" : "flex-start",
        }}
      >
        <MDBox pl={1}>
          <MDTypography
            variant="h6"
            color={userDetails?.name == name ? "success" : "info"}
            sx={{ whiteSpace: "normal" }}
          >
            {name}
          </MDTypography>
          <MDTypography component="p" variant="button" color="text" sx={{ whiteSpace: "normal" }}>
            {msg}
          </MDTypography>
        </MDBox>
      </Card>
    </>
  );
};

const mapStoreStateToProps = ({ auth, dashboard }) => {
  return {
    ...auth,
  };
};

export default connect(mapStoreStateToProps)(Message);
