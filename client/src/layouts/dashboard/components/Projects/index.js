/* eslint-disable react/prop-types */

import { useState } from "react";

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
import AllDealsData from "layouts/dashboard/components/Projects/data/AllDealsData";
import UserAuctionsData from "layouts/dashboard/components/Projects/data/UserAuctionsData";
import UserDealsData from "layouts/dashboard/components/Projects/data/UserDealsData";

function Projects({ name }) {
  const { columns, rows } = UserDealsData();
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

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
      <MenuItem onClick={closeMenu}>All Auctions</MenuItem>
      <MenuItem onClick={closeMenu}>Your Created Auctions</MenuItem>
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
}

export default Projects;
