/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import { useChannel } from "ably/react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";
import { connect } from "react-redux";

const Message = ({ username, msg, userDetails }) => {
  return (
    <>
      <Card
        style={{
          display: "inline-block",
          maxWidth: "fit-content",
          padding: "5px 8px",
          marginBottom: "2px",
          alignSelf: userDetails?.username == username ? "flex-end" : "flex-start",
        }}
      >
        <MDBox pl={1}>
          <MDTypography
            variant="h6"
            color={userDetails?.username == username ? "success" : "info"}
            sx={{ whiteSpace: "normal" }}
          >
            {username}
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
