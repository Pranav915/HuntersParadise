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

export default function UserAuctionsData(myAuctions) {
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  console.log("myAuctions123", myAuctions);
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
      <IconButton sx={navbarIconButton} size="small">
        <Icon sx={iconsStyle}>edit</Icon>
      </IconButton>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Name", accessor: "auctionTitle", width: "45%", align: "left" },
      { Header: "Start Price", accessor: "startTime", align: "center" },
      { Header: "Total Products", accessor: "totalProducts", align: "center" },
      { Header: "", accessor: "btn", align: "center" },
    ],

    rows: myAuctions.map((auction) => {
      const rowData = {
        auctionTitle: (
          <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
            {auction?.auctionTitle}
          </MDTypography>
        ),
        startTime: (
          <MDTypography display="block" variant="button" fontWeight="medium">
            152
          </MDTypography>
        ),
        totalProducts: (
          <MDTypography display="block" variant="button" fontWeight="medium">
            {auction?.currentProduct}
          </MDTypography>
        ),
        action: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <IconButton
              sx={navbarIconButton}
              size="small"
              onClick={() => {
                navigate(`/liveAuction/${auction?.auctionId}`, {
                  state: { data: { auction: auction, sender: "all" } },
                });
              }}
            >
              <Icon sx={iconsStyle}>login</Icon>
            </IconButton>
          </MDBox>
        ),
      };
      return rowData;
    }),
  };
}
