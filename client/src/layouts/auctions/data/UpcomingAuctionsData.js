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

export default function UpcomingAuctionsData(upcomingAuctions) {
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

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formatAuctionStartTime = (startTime) => {
    const date = new Date(startTime);
    return date.toLocaleDateString("en-US", options);
  };

  return {
    columns: [
      { Header: "Auction Title", accessor: "auctionTitle", width: "30%", align: "left" },
      { Header: "Auction Host", accessor: "auctionHost", align: "left" },
      { Header: "Total Products", accessor: "totalProducts", align: "center" },
      { Header: "Start Time", accessor: "startTime", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: upcomingAuctions.map((auction) => {
      const rowData = {
        auctionTitle: <Author name={auction?.auctionTitle} />,
        auctionHost: (
          <AuctionHost name={auction?.auctionHost?.name} email={auction?.auctionHost?.email} />
        ),
        totalProducts: (
          <MDTypography display="block" variant="button" fontWeight="medium">
            {auction?.productList?.length}
          </MDTypography>
        ),
        startTime: (
          <MDTypography display="block" variant="button" fontWeight="medium">
            {formatAuctionStartTime(auction?.startTime)}
          </MDTypography>
        ),
        action: (
          <Button
            variant="text"
            onClick={() => {
              navigate(`/auctionDetail/${auction.auctionTitle}`, {
                state: { data: { auction: auction, sender: "all" } },
              });
            }}
          >
            See Details
          </Button>
        ),
      };
      return rowData;
    }),
  };
}
