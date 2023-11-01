/* eslint-disable react/prop-types */
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Code Pulse React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Code Pulse React context
import { useMaterialUIController } from "context";
import { Divider } from "@mui/material";

function Bill({ name, productName, email, status, amount }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      px={3}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name}
          </MDTypography>
        </MDBox>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDBox>
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                Status:&nbsp;&nbsp;&nbsp;
                <MDTypography variant="caption" fontWeight="medium">
                  {status}
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox>
            <MDBox lineHeight={0}>
              <MDTypography variant="caption" color="text">
                Amount:&nbsp;&nbsp;&nbsp;
                <MDTypography
                  variant="button"
                  color={status === "Outstanding" ? "success" : "error"}
                  fontWeight="medium"
                  textGradient
                >
                  {status === "Outstanding" ? "+" : "-"} {amount}
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
        {status === "Outstanding" ? (
          <></>
        ) : (
          <MDButton variant="text" color={darkMode ? "white" : "dark"}>
            <Icon>done</Icon>&nbsp;Mark as Product Received
          </MDButton>
        )}
        <Divider />
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
