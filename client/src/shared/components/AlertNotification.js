/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";
import { connect } from "react-redux";
import { getActions } from "app/actions/alertActions";
import MDSnackbar from "components/MDSnackbar";

const AlertNotification = ({ showAlertMessage, closeAlertMessage, alertMessageContent }) => {
  const [errorSB, setErrorSB] = useState(false);
  const closeErrorSB = () => setErrorSB(false);
  // useEffect(() => {
  //   console.log("hii", showAlertMessage);
  //   if (showAlertMessage) setErrorSB(true);
  // }, [showAlertMessage]);
  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={showAlertMessage}
      onClose={closeAlertMessage}
      autoHideDuration={4000}
    >
      <Alert severity="info">{alertMessageContent}</Alert>
    </Snackbar>
    // <MDSnackbar
    //   color="error"
    //   icon="warning"
    //   title="Material Dashboard"
    //   content="Hello, world! This is a notification message"
    //   dateTime="11 mins ago"
    //   open={errorSB}
    //   onClose={closeErrorSB}
    //   close={closeErrorSB}
    //   bgWhite
    // />
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
