/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Code Pulse React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Code Pulse React examples
import DataTable from "examples/Tables/DataTable";

// Data
import UserAuctionsData from "layouts/dashboard/components/Projects/data/UserAuctionsData";
import UserDealsData from "layouts/dashboard/components/Projects/data/UserDealsData";
import { connect } from "react-redux";
import { getDealActions } from "app/actions/dealActions";
import ParticipatedDealsData from "./data/ParticipatedDealsData";
import LiveAuctionsData from "./data/LiveAuctionsData";
import { getAuctionActions } from "app/actions/auctionActions";

const Projects = ({ name, participatedDeals, createdDeals, liveAuctions, myAuctions }) => {
  const [menu, setMenu] = useState(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [title, setTitle] = useState("");
  const liveAuctionsData = LiveAuctionsData(liveAuctions);
  const participatedDealsData = ParticipatedDealsData(participatedDeals);
  const userDealsData = UserDealsData(createdDeals);
  const userAuctionsData = UserAuctionsData(myAuctions);

  useEffect(() => {
    if (name == "Deals") {
      const { columns, rows } = participatedDealsData;
      setColumns(columns);
      setRows(rows);
      setTitle("My Offers");
    } else {
      const { columns, rows } = liveAuctionsData;
      setColumns(columns);
      setRows(rows);
      setTitle("Live Auctions");
    }
  }, []);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const handleBuyerSelect = () => {
    if (name == "Deals") {
      const { columns, rows } = participatedDealsData;
      setColumns(columns);
      setRows(rows);
      setTitle("My Offers");
    } else {
      const { columns, rows } = liveAuctionsData;
      setColumns(columns);
      setRows(rows);
      setTitle("Live Auctions");
    }
  };
  const handleSellerSelect = () => {
    if (name == "Deals") {
      const { columns, rows } = userDealsData;
      setColumns(columns);
      setRows(rows);
      setTitle("My Created Deals");
    } else {
      const { columns, rows } = userAuctionsData;
      setColumns(columns);
      setRows(rows);
      setTitle("My Created Auctions");
    }
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={handleBuyerSelect}>
        {name == "Deals" ? "My Offers" : "Live Auctions"}
      </MenuItem>
      <MenuItem onClick={handleSellerSelect}>
        {name == "Deals" ? "My Created Deals" : "My Created Auctions"}
      </MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            {title}
          </MDTypography>
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          canSearch={true}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          canSearch={false}
          entriesPerPage={true}
        />
      </MDBox>
    </Card>
  );
};

const mapStoreStateToProps = ({ deal, auction }) => {
  return {
    ...deal,
    ...auction,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getDealActions(dispatch),
    ...getAuctionActions(dispatch),
  };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(Projects);
