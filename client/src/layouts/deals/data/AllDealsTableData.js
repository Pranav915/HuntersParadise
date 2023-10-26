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

export default function AllDealsTableData(allDeals) {
  const handleSeeDetails = () => {
    console.log("see details");
  };

  const Product = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const AskedPrice = ({ price }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {price}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Product Name", accessor: "productName", width: "45%", align: "left" },
      { Header: "Asked Price", accessor: "askedPrice", align: "left" },
      { Header: "Category", accessor: "category", align: "center" },
      { Header: "Seller Name", accessor: "sellerName", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: allDeals.map((deal) => {
      const rowData = {
        productName: <Product image={deal?.productImage} name={deal?.productName} />,
        askedPrice: <AskedPrice price={deal?.askPrice} />,
        category: <AskedPrice price={deal?.category} />,
        sellerName: <AskedPrice price={deal?.sellerName} />,
        action: <MDButton onClick={handleSeeDetails}>See Details</MDButton>,
      };
      return rowData;
    }),
  };
}
