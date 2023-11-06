/* eslint-disable react/prop-types */

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Bill from "layouts/billing/components/Bill";

function BillingInformation({ pendingTransactions, userId }) {
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Pending Transactions
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {pendingTransactions?.map((transaction, key) =>
            transaction.to === userId ? (
              <Bill
                name={transaction.sender_name}
                status="Outstanding"
                amount={transaction.amount}
                key={key}
              />
            ) : (
              <Bill
                name={transaction.sender_name}
                status="Freezed"
                amount={transaction.amount}
                key={key}
              />
            )
          )}
          {/* <Bill name="oliver liam" status="Freezed" amount="2500" />
          <Bill
            name="lucas harper"
            productName="stone tech zone"
            email="lucas@stone-tech.com"
            status="Outstanding"
            amount="1200"
          /> */}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default BillingInformation;
