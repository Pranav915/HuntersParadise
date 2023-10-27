/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// @mui material components
import Icon from "@mui/material/Icon";

// Code Pulse React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import { IconButton } from "@mui/material";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import { useMaterialUIController } from "context";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { completeDeal } from "app/actions/dealActions";

export default function DealUsers(dealDetails) {
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  const dispatchAction = useDispatch();
  const navigate = useNavigate();

  const handleCompleteDeal = () => {};
  const Project = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const TextComponent = ({ data }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="button" color="text" fontWeight="medium">
        {data}
      </MDTypography>
    </MDBox>
  );

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = darkMode ? white.main : dark.main;

      if (transparentNavbar) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return {
    columns: [
      { Header: "Name", accessor: "buyersName", width: "30%", align: "center" },
      { Header: "Offered Price", accessor: "askedPrice", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: dealDetails?.dealDetails?.offers?.map((offer) => {
      let userData = {
        buyersName: <Project name={offer?.offer?.offered_by_name} />,
        askedPrice: <TextComponent data={"$" + offer?.offer?.offeredPrice} />,
        action: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <IconButton sx={navbarIconButton} size="small">
              <Icon sx={iconsStyle}>chat</Icon>
            </IconButton>
            <IconButton
              sx={navbarIconButton}
              size="small"
              onClick={() => {
                dispatchAction(completeDeal({ offerId: offer?.offer?._id }, navigate));
              }}
            >
              <Icon sx={iconsStyle}>sell</Icon>
            </IconButton>
          </MDBox>
        ),
      };
      return userData;
    }),
  };
}
