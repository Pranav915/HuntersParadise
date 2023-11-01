/* eslint-disable react/prop-types */
// @mui material components
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";

// Code Pulse React components
import MDBox from "components/MDBox";

// Code Pulse React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import { Card, Icon, IconButton, Modal } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import MDInput from "components/MDInput";
import { useMaterialUIController } from "context";
import { getWalletActions } from "app/actions/walletActions";

const Billing = ({
  userDetails,
  addFund,
  withdrawFund,
  availableBalance,
  freezedBalance,
  outstandingBalance,
  totalBalance,
  getBalance,
  setOutstandingBalance,
}) => {
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  const [openAdd, setOpenAdd] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [addValue, setAddValue] = useState(null);
  const [withdrawValue, setWithdrawValue] = useState(null);

  const handleCloseAdd = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpenAdd(false);
  };

  const handleCloseWithdraw = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpenWithdraw(false);
  };

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = darkMode ? white.main : dark.main;

      if (transparentNavbar) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  const handleSubmitAdd = (event) => {
    event.preventDefault();
    const req = {
      amount: addValue,
    };
    addFund(req);
    setAddValue("");
    handleCloseAdd();
  };

  useEffect(() => {
    getBalance();
  }, []);

  const handleSubmitWithdraw = (event) => {
    event.preventDefault();
    const data = {
      amount: withdrawValue,
    };
    withdrawFund(data);
    setWithdrawValue("");
    handleCloseWithdraw();
  };

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
                    value={"$" + totalBalance}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="wallet"
                    title="Available Balance"
                    description="Available for transactions"
                    value={"$" + availableBalance}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="hourglass_top"
                    title="Transit Balance"
                    description="Incoming Payment"
                    value={"$" + outstandingBalance}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="ac_unit"
                    title="Freezed Balance"
                    description="Outgoing Payment"
                    value={"$" + freezedBalance}
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
                    {"$" + userDetails?.wallet?.totalBalance}
                  </MDTypography>
                  <MDBox display="flex" justifyContent="center" mt={1}>
                    <Grid item xs={12} sm={6} lg={5} pr={1.5}>
                      <MDButton variant="gradient" color="success" onClick={() => setOpenAdd(true)}>
                        Add Balance
                      </MDButton>
                      <Modal
                        open={openAdd}
                        onClose={handleCloseAdd}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <MDBox>
                          <Card>
                            <MDBox
                              sx={{
                                px: 2,
                                py: 1,
                              }}
                              id="modal-modal-title"
                            >
                              <MDBox
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <MDTypography variant="h6" component="h2">
                                  Add Money
                                </MDTypography>
                                <MDBox>
                                  <IconButton
                                    sx={navbarIconButton}
                                    aria-label="Delete"
                                    onClick={handleCloseAdd}
                                  >
                                    <CloseIcon sx={iconsStyle} />
                                  </IconButton>
                                </MDBox>
                              </MDBox>
                            </MDBox>
                            <MDBox component="form" role="form" mx={5} onSubmit={handleSubmitAdd}>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <MDInput
                                    required
                                    type="text"
                                    label="Enter Amount"
                                    name="addValue"
                                    value={addValue}
                                    onChange={(e) => setAddValue(e.target.value)}
                                    autoComplete="addValue"
                                    fullWidth
                                  />
                                </Grid>
                              </Grid>
                              <MDBox
                                sx={{ display: "flex", justifyContent: "right" }}
                                mx={5}
                                my={2}
                              >
                                <MDButton color="dark" variant="gradient" type="submit">
                                  Submit
                                </MDButton>
                              </MDBox>
                            </MDBox>
                          </Card>
                        </MDBox>
                      </Modal>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={5} pl={1.5}>
                      <MDButton
                        variant="gradient"
                        color="error"
                        onClick={() => setOpenWithdraw(true)}
                      >
                        Withdraw Balance
                      </MDButton>
                      <Modal
                        open={openWithdraw}
                        onClose={handleCloseWithdraw}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <MDBox>
                          <Card>
                            <MDBox
                              sx={{
                                px: 2,
                                py: 1,
                              }}
                              id="modal-modal-title"
                            >
                              <MDBox
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <MDTypography variant="h6" component="h2">
                                  Withdraw Money
                                </MDTypography>
                                <MDBox>
                                  <IconButton
                                    sx={navbarIconButton}
                                    aria-label="Delete"
                                    onClick={handleCloseWithdraw}
                                  >
                                    <CloseIcon sx={iconsStyle} />
                                  </IconButton>
                                </MDBox>
                              </MDBox>
                            </MDBox>
                            <MDBox
                              component="form"
                              role="form"
                              mx={5}
                              onSubmit={handleSubmitWithdraw}
                            >
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <MDInput
                                    required
                                    type="text"
                                    label="Enter Amount"
                                    name="withdrawValue"
                                    value={withdrawValue}
                                    onChange={(e) => setWithdrawValue(e.target.value)}
                                    autoComplete="withdrawValue"
                                    fullWidth
                                  />
                                </Grid>
                              </Grid>
                              <MDBox
                                sx={{ display: "flex", justifyContent: "right" }}
                                mx={5}
                                my={2}
                              >
                                <MDButton color="dark" variant="gradient" type="submit">
                                  Submit
                                </MDButton>
                              </MDBox>
                            </MDBox>
                          </Card>
                        </MDBox>
                      </Modal>
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
};

const mapStoreStateToProps = ({ auth, wallet }) => {
  return {
    ...auth,
    ...wallet,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getWalletActions(dispatch),
  };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(Billing);
