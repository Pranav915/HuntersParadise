/* eslint-disable react/prop-types */
import { Card, CircularProgress, Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import HostCard from "./components/HostCard";
import BidPage from "./components/BidPage";
import ProductCard from "./components/ProductCard";
import ChatCard from "./components/ChatCard";
import { useAbly } from "ably/react";
import Spaces from "@ably/spaces";
import { SpacesProvider, SpaceProvider, useSpace } from "@ably/spaces/react";
import { realtime } from "ably.js";
import { getAuctionActions } from "app/actions/auctionActions";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";

const LiveAuction = ({ getLiveAuctionDetails }) => {
  const location = useLocation();
  const [liveAuctionDetails, setLiveAuctionDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHost, setIsHost] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [remainingProducts, setRemainingProducts] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const spaces = new Spaces(realtime);

  const space = useSpace((update) => {
    console.log(update);
  });
  console.log("space", space);

  useEffect(() => {
    getLiveAuctionDetails(
      location?.state?.data?.auction?.auctionId,
      setLiveAuctionDetails,
      setIsLoading,
      setIsHost
    );
  }, []);

  useEffect(() => {
    setTotalProducts(liveAuctionDetails?.productList.length);
    setRemainingProducts(liveAuctionDetails?.productList.length);
    setSelectedProduct(liveAuctionDetails?.productList[0]);
  }, [liveAuctionDetails, setLiveAuctionDetails]);

  return (
    <PageLayout>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container>
          <Grid item xs={0} md={3}>
            <Grid container spacing={2} p={2}>
              <Grid item xs={12}>
                <HostCard data={liveAuctionDetails} />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Card sx={{ flex: 1 }}>
                  <MDBox p={2}>
                    <MDTypography variant="h5" color="text">
                      {remainingProducts} of {totalProducts} Products Remaining
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
                      {liveAuctionDetails?.productList.map((product, key) => (
                        <ProductCard
                          key={key}
                          product={product}
                          handleSetSelectedProduct={() => setSelectedProduct(product)}
                        />
                      ))}
                    </MDBox>
                  </Card>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} py={2}>
            {selectedProduct?.status == "live" ? (
              <BidPage />
            ) : (
              <ProductDetails selectedProduct={selectedProduct} />
            )}
          </Grid>
          <Grid item xs={12} md={3} p={2} sx={{ display: "flex", flexDirection: "column" }}>
            <Card sx={{ flex: 1 }}>
              <ChatCard />
            </Card>
          </Grid>
        </Grid>
      )}
    </PageLayout>
  );
};

const mapStoreStateToProps = ({ auth, auction }) => {
  return {
    ...auction,
    ...auth,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getAuctionActions(dispatch),
  };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(LiveAuction);
