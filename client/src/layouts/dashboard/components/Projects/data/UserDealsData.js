/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import IconButton from "@mui/material/IconButton";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import { Icon } from "@mui/material";
import { useMaterialUIController } from "context";

export default function UserDealsData(createdDeals) {
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <MDTypography variant="button" fontWeight="medium" lineHeight={1}>
        {name}
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
      { Header: "Name", accessor: "name", width: "45%", align: "left" },
      { Header: "Asked Price", accessor: "sPrice", align: "center" },
      { Header: "Top Offer", accessor: "topOffer", align: "center" },
      { Header: "", accessor: "btns", align: "center" },
    ],

    rows: createdDeals.map((deal) => {
      const newdata = {
        name: <Company image={logoXD} name={deal?.productName} />,
        sPrice: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {deal?.askPrice}
          </MDTypography>
        ),
        topOffer: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {}
          </MDTypography>
        ),
        btns: <ButtonsBox />,
      };
      return newdata;
    }),
  };
}
