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
import { Button, Icon } from "@mui/material";
import { useMaterialUIController } from "context";
import MDBadge from "components/MDBadge";
import { useNavigate } from "react-router-dom";

export default function LiveAuctionsData(liveAuctions) {
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  const navigate = useNavigate();
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
        <Icon sx={iconsStyle}>login</Icon>
      </IconButton>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Auction Title", accessor: "auctionTitle", width: "30%", align: "left" },
      { Header: "Ongoing Product", accessor: "ongoingProduct", width: "30%", align: "center" },
      { Header: "Top Bid", accessor: "highestBid", align: "center" },
      {
        Header: "Participants",
        accessor: "totalParticipants",
        align: "center",
      },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: liveAuctions.map((auction) => {
      const rowData = {
        auctionTitle: (
          <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
            {auction?.auctionTitle}
          </MDTypography>
        ),
        totalParticipants: (
          <MDTypography display="block" variant="button" fontWeight="medium">
            152
          </MDTypography>
        ),
        ongoingProduct: (
          <MDTypography display="block" variant="button" fontWeight="medium">
            {auction?.currentProduct}
          </MDTypography>
        ),
        highestBid: (
          <MDTypography variant="button" fontWeight="medium">
            {auction?.currentHighestBid?.bidValue}
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
