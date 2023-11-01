/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import { Alert, Box, Button, IconButton, Snackbar, Typography } from "@mui/material";
import { connect } from "react-redux";
import { getActions } from "app/actions/alertActions";
import { useNavigate } from "react-router-dom";

const AlertNotification = ({ showAlertMessage, closeAlertMessage, alertMessageContent }) => {
  console.log("alertMessageContent", alertMessageContent);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(alertMessageContent?.link, {
      state: { data: { deal: alertMessageContent.item, sender: "all" } },
    });
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={showAlertMessage}
      onClose={closeAlertMessage}
      autoHideDuration={4000}
      onClick={handleClick}
    >
      <Alert severity="info">
        <Box>
          <Typography>{alertMessageContent?.title}</Typography>
          <Typography>{alertMessageContent?.content}</Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
};

const mapStoreStateToProps = ({ alert }) => {
  return {
    ...alert,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(AlertNotification);
