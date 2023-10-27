import { Card, Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import HostCard from "./components/HostCard";
import BidPage from "./components/BidPage";
import ProductCard from "./components/ProductCard";
import ChatCard from "./components/ChatCard";

const LiveAuction = () => {
  const [progress, setProgress] = useState(0);

  return (
    <PageLayout>
      <Grid container>
        <Grid item xs={0} md={3}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12}>
              <HostCard />
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <Card sx={{ flex: 1 }}>
                <MDBox p={2}>
                  <MDTypography variant="h5" color="text">
                    500 of 700 Products Remaining
                  </MDTypography>
                  <MDBox mt={2}>
                    <LinearProgress variant="determinate" value={progress} />
                  </MDBox>
                </MDBox>
                <Card
                  sx={{
                    maxHeight: "386px",
                    overflow: "hidden",
                    paddingBottom: 2,
                  }}
                >
                  <MDBox sx={{ overflow: "auto" }}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                  </MDBox>
                </Card>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} py={2}>
          <BidPage />
        </Grid>
        <Grid item xs={12} md={3} p={2} sx={{ display: "flex", flexDirection: "column" }}>
          <Card sx={{ flex: 1 }}>
            <ChatCard />
          </Card>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default LiveAuction;
