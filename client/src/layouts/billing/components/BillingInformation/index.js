// @mui material components
import Card from "@mui/material/Card";

// Code Pulse React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";

function BillingInformation() {
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Incoming / Freezed Transactions
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill
            name="oliver liam"
            productName="viking burrito"
            email="oliver@burrito.com"
            status="Freezed"
            amount="2500"
          />
          <Bill
            name="lucas harper"
            productName="stone tech zone"
            email="lucas@stone-tech.com"
            status="Outstanding"
            amount="1200"
          />
          <Bill
            name="ethan james"
            productName="fiber notion"
            email="ethan@fiber.com"
            status="Freezed"
            amount="650"
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default BillingInformation;
