/* eslint-disable react/prop-types */

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Transaction from "layouts/billing/components/Transaction";

function Transactions({ completeTransactions, userId }) {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Your Transaction&apos;s
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
          <MDBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </MDBox>
          <MDTypography variant="button" color="text" fontWeight="regular">
            Completed
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {completeTransactions?.map((transaction, index) => {
            let color = "";
            let name = "";
            if (transaction.typeOf === "addFunds") {
              color = "success";
              name = "Added to Wallet";
            } else if (transaction.typeOf === "withdrawFunds") {
              color = "error";
              name = "Withdrawn from Wallet";
            } else if (transaction.to === userId) {
              color = "success";
              name = "Transaction";
            } else if (transaction.from === userId) {
              color = "error";
              name = "Transaction";
            }

            const formattedDate = new Date(transaction.createdAt).toLocaleString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <Transaction
                key={index}
                color={color}
                icon={color === "error" ? "expand_more" : "expand_less"}
                name={name}
                description={formattedDate}
                value={
                  color === "error" ? "- $ " + transaction.amount : "+ $ " + transaction.amount
                }
              />
            );
          })}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Transactions;
