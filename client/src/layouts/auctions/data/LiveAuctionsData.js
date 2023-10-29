/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Code Pulse React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import LoginIcon from "@mui/icons-material/Login";
// Images
import team2 from "assets/images/team-2.jpg";
import { useState } from "react";
import { Button, Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LiveAuctionsData(liveAuctions) {
  const navigate = useNavigate();
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
      {/* <MDTypography variant="caption">{email}</MDTypography> */}
    </MDBox>
  );

  const AuctionHost = ({ name, email }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {name}
      </MDTypography>
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Auction Title", accessor: "auctionTitle", width: "20%", align: "left" },
      { Header: "Auction Host", accessor: "auctionHost", align: "left" },
      { Header: "Total Participants", accessor: "totalParticipants", align: "center" },
      { Header: "Ongoing Product", accessor: "ongoingProduct", align: "center" },
      { Header: "Highest Bid", accessor: "highestBid", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: liveAuctions.map((auction) => {
      const rowData = {
        auctionTitle: <Author name={auction?.auctionTitle} />,
        auctionHost: (
          <AuctionHost name={auction?.auctionHost?.name} email={auction?.auctionHost?.email} />
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
          <Button
            variant="contained"
            startIcon={<LoginIcon />}
            onClick={() => {
              navigate(`/liveAuction/${auction?.auctionId}`, {
                state: { data: { auction: auction, sender: "all" } },
              });
            }}
          >
            Enter
          </Button>
        ),
      };
      return rowData;
    }),
  };
}
