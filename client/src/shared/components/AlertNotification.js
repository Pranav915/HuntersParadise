/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import { connect } from "react-redux";
import { getActions } from "app/actions/alertActions";

const AlertNotification = ({ showAlertMessage, closeAlertMessage, alertMessageContent }) => {
  console.log("alertMessageContent", alertMessageContent);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={showAlertMessage}
      onClose={closeAlertMessage}
      autoHideDuration={4000}
    >
      <Alert severity="info">{alertMessageContent}</Alert>
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
