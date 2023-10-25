// @mui material components
import Grid from "@mui/material/Grid";

// Code Pulse React components
import MDBox from "components/MDBox";

// Code Pulse React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import { Card, Icon } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

function Billing() {
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Total Balance"
                    description="(AB + TB + FB)"
                    value="$770"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="wallet"
                    title="Available Balance"
                    description="Available for transactions"
                    value="$455.00"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="hourglass_top"
                    title="Transit Balance"
                    description="Incoming Payment"
                    value="$125.00"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="ac_unit"
                    title="Freezed Balance"
                    description="Outgoing Payment"
                    value="$200.00"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <PaymentMethod />
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card sx={{ height: "100%" }}>
                <MDBox
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                >
                  {/* <MDTypography variant="h4" fontWeight="medium" mt={2}>
                    Wallet
                  </MDTypography> */}
                  <MDBox
                    display="grid"
                    justifyContent="center"
                    alignItems="center"
                    bgColor="info"
                    mt={2}
                    width="4rem"
                    height="4rem"
                    color="white"
                    shadow="md"
                    borderRadius="lg"
                    variant="gradient"
                  >
                    <AccountBalanceWalletIcon />
                  </MDBox>
                  <MDTypography variant="h3" fontWeight="medium" p={1} mt={1}>
                    $455.00
                  </MDTypography>
                  <MDBox display="flex" justifyContent="center" mt={1}>
                    <Grid item xs={12} sm={6} lg={5} pr={1.5}>
                      <MDButton variant="gradient" color="success">
                        Add Balance
                      </MDButton>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={5} pl={1.5}>
                      <MDButton variant="gradient" color="error">
                        Withdraw Balance
                      </MDButton>
                    </Grid>
                  </MDBox>
                </MDBox>
                {/* <MDBox p={2}>
                  <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    <Invoice date="March, 01, 2020" id="#MS-415646" price="$180" />
                    <Invoice date="February, 10, 2021" id="#RV-126749" price="$250" />
                    <Invoice date="April, 05, 2020" id="#QW-103578" price="$120" />
                    <Invoice date="June, 25, 2019" id="#MS-415646" price="$180" />
                    <Invoice date="March, 01, 2019" id="#AR-803481" price="$300" noGutter />
                  </MDBox>
                </MDBox> */}
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
