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
import AllAuctionsData from "layouts/dashboard/components/Projects/data/AllAuctionsData";
import UserAuctionsData from "layouts/dashboard/components/Projects/data/UserAuctionsData";
import UserDealsData from "layouts/dashboard/components/Projects/data/UserDealsData";
import AllDealsData from "./data/AllDealsData";
import { connect } from "react-redux";
import { getDealActions } from "app/actions/dealActions";

const Projects = ({ name, myOffers }) => {
  const [menu, setMenu] = useState(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const auctionsData = AllAuctionsData();
  const dealsData = AllDealsData(myOffers);
  const userDealsData = UserDealsData();
  const userAuctionsData = UserAuctionsData();

  useEffect(() => {
    if (name == "Deals") {
      const { columns, rows } = dealsData;
      setColumns(columns);
      setRows(rows);
    } else {
      const { columns, rows } = auctionsData;
      setColumns(columns);
      setRows(rows);
    }
  }, []);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const handleBuyerSelect = () => {
    if (name == "Deals") {
      const { columns, rows } = dealsData;
      setColumns(columns);
      setRows(rows);
    } else {
      const { columns, rows } = auctionsData;
      setColumns(columns);
      setRows(rows);
    }
  };
  const handleSellerSelect = () => {
    if (name == "Deals") {
      const { columns, rows } = userDealsData;
      setColumns(columns);
      setRows(rows);
    } else {
      const { columns, rows } = userAuctionsData;
      setColumns(columns);
      setRows(rows);
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
        {name == "Deals" ? "All Deals" : "All Auctions"}
      </MenuItem>
      <MenuItem onClick={handleSellerSelect}>
        {name == "Deals" ? "Your Created Deals" : "Your Created Auctions"}
      </MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            {name}
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
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          canSearch={true}
          entriesPerPage={true}
        />
      </MDBox>
    </Card>
  );
};

const mapStoreStateToProps = ({ deal }) => {
  return {
    ...deal,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getDealActions(dispatch),
  };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(Projects);
