/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import IconButton from "@mui/material/IconButton";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";

// Images
import { Icon } from "@mui/material";
import { useMaterialUIController } from "context";
import MDBadge from "components/MDBadge";

export default function UserAuctionsData() {
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

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = darkMode ? white.main : dark.main;

      if (transparentNavbar) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  const BtnBox = () => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <IconButton sx={navbarIconButton} size="small" disableRipple>
        <Icon sx={iconsStyle}>edit</Icon>
      </IconButton>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Name", accessor: "name", width: "45%", align: "left" },
      { Header: "Start Price", accessor: "sPrice", align: "center" },
      { Header: "Participants", accessor: "participants", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "", accessor: "btn", align: "center" },
    ],

    rows: [
      {
        name: (
          <MDTypography variant="h6" color="text" fontWeight="medium">
            Pranav
          </MDTypography>
        ),
        sPrice: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $14,000
          </MDTypography>
        ),
        participants: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            100
          </MDTypography>
        ),
        topBid: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            500
          </MDTypography>
        ),
        status: false ? (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ) : (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            500
          </MDTypography>
        ),
        btn: <BtnBox />,
      },
    ],
  };
}
