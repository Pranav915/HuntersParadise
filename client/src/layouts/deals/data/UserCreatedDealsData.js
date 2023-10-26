/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// @mui material components
import Icon from "@mui/material/Icon";

// Code Pulse React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import { IconButton } from "@mui/material";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import { useMaterialUIController } from "context";

export default function UserCreatedDealsData(createdDeals) {
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  const Project = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" variant="rounded" /> */}
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
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

  const ButtonsBox = () => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <IconButton sx={navbarIconButton} size="small" disableRipple>
        <Icon sx={iconsStyle}>chat</Icon>
      </IconButton> */}
      <IconButton sx={navbarIconButton} size="small">
        <Icon sx={iconsStyle}>info</Icon>
      </IconButton>
      <IconButton sx={navbarIconButton} size="small">
        <Icon sx={iconsStyle}>delete</Icon>
      </IconButton>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Product Name", accessor: "productName", width: "30%", align: "left" },
      { Header: "Asked Price", accessor: "askedPrice", align: "left" },
      { Header: "Category", accessor: "category", align: "center" },
      { Header: "Top Offer", accessor: "topOffer", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: createdDeals.map((deal) => {
      let dealData = {
        productName: <Project name={deal?.productName} />,
        askedPrice: <TextComponent data={deal?.askPrice} />,
        category: <TextComponent data={deal?.category} />,
        topOffer: <TextComponent data={deal?.askPrice} />,
        action: <ButtonsBox />,
      };
      return dealData;
    }),
  };
}
