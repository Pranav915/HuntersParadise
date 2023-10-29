/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Code Pulse React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import MDButton from "components/MDButton";
import { Icon, IconButton } from "@mui/material";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import { useMaterialUIController } from "context";
import { useNavigate } from "react-router-dom";

export default function AllDealsTableData(allDeals) {
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  const navigate = useNavigate();

  const Product = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const AskedPrice = ({ price }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="button" color="text" fontWeight="medium">
        {price}
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

  const ButtonsBox = (deal) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDButton
        onClick={(deal) => {
          navigate(`/dealDetail/${deal?.productName}`, { state: { data: item } });
        }}
      >
        See Details
      </MDButton>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Product Name", accessor: "productName", align: "left" },
      { Header: "Ask Price", accessor: "askedPrice", align: "left" },
      { Header: "Category", accessor: "category", align: "center" },
      { Header: "Seller Name", accessor: "sellerName", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: allDeals.map((deal) => {
      const rowData = {
        productName: <Product name={deal?.productName} />,
        askedPrice: (
          <MDBox lineHeight={1} textAlign="left">
            <MDTypography display="block" variant="button" color="text" fontWeight="medium">
              {"$" + deal?.askPrice}
            </MDTypography>
          </MDBox>
        ),
        category: <AskedPrice price={deal?.category} />,
        sellerName: <AskedPrice price={deal?.sellerName} />,
        action: (
          <MDButton
            onClick={() => {
              navigate(`/dealDetail/${deal?.productName}`, {
                state: { data: { deal: deal, sender: "all" } },
              });
            }}
          >
            See Details
          </MDButton>
        ),
      };
      return rowData;
    }),
  };
}
