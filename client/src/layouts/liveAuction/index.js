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
import ChatCard from "./components/chat/ChatCard";
import { useChannel } from "ably/react";
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
  const [productList, setProductList] = useState([]);
  const [liveProduct, setLiveProduct] = useState("");
  const [highestBidder, setHighestBidder] = useState(null);

  const productStartChannel = useChannel(
    "auction:" + liveAuctionDetails?.auctionId,
    "ProductStart",
    (message) => {
      console.log("message", message);
      getLiveAuctionDetails(
        location?.state?.data?.auction?.auctionId,
        setLiveAuctionDetails,
        setIsLoading,
        setIsHost
      );
    }
  ).channel;

  const auctionArenaChannel = useChannel(
    "auction:" + getLiveAuctionDetails?._id,
    "auction",
    (message) => {
      let liveAuctionDetails = liveAuctionDetails?.productList.map((product) => {
        if (product.product.name === message.data.product.product.name) {
          return {
            ...product,
            status: "live",
          };
        }
        return product;
      });
      setLiveAuctionDetails(liveAuctionDetails);
      setProductList(liveAuctionDetails?.productList);
      setLiveProduct(liveAuctionDetails?.currentProduct);
    }
  ).channel;

  const auctionProductSoldChannel = useChannel(
    "auction:" + getLiveAuctionDetails?._id,
    "ProductSold",
    (message) => {
      getLiveAuctionDetails(
        location?.state?.data?.auction?.auctionId,
        setLiveAuctionDetails,
        setIsLoading,
        setIsHost
      );
    }
  ).channel;

  useEffect(() => {
    getLiveAuctionDetails(
      location?.state?.data?.auction?.auctionId,
      setLiveAuctionDetails,
      setIsLoading,
      setIsHost
    );
  }, []);

  useEffect(() => {
    console.log("use effect called");
    let isLiveAvailable = false;
    setTotalProducts(liveAuctionDetails?.productList.length);
    setRemainingProducts(liveAuctionDetails?.productList.length);
    liveAuctionDetails?.productList.forEach((product) => {
      if (product.status == "live") {
        isLiveAvailable = true;
        setSelectedProduct(product);
      }
    });
    if (!isLiveAvailable) {
      setSelectedProduct(liveAuctionDetails?.productList[0]);
    }

    setHighestBidder(liveAuctionDetails?.currentHighestBid);
  }, [liveAuctionDetails, setLiveAuctionDetails]);

  useEffect(() => {
    console.log("selectedProduct", selectedProduct);
  }, [selectedProduct, setSelectedProduct]);

  return (
    <PageLayout>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container>
          <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column" }}>
            <Grid container spacing={2} p={2}>
              <Grid item xs={12}>
                <HostCard data={liveAuctionDetails} isHost={isHost} />
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ flex: 1 }}>
                  <MDBox p={2}>
                    <MDTypography variant="h5" color="text">
                      {remainingProducts} of {totalProducts} Products Remaining
                    </MDTypography>
                    <MDBox mt={2}>
                      <LinearProgress variant="determinate" value={progress} />
                    </MDBox>
                  </MDBox>
                  <Card>
                    <MDBox
                      sx={{
                        overflowY: "auto",
                        maxHeight: "384px",
                        mt: 1,
                        "::-webkit-scrollbar": {
                          width: 0,
                          background: "transparent",
                        },
                        "::-webkit-scrollbar-thumb": {
                          background: "transparent",
                        },
                        scrollbarWidth: "none",
                      }}
                    >
                      {liveAuctionDetails?.productList.map((product, key) =>
                        product.status == "live" ? (
                          <ProductCard
                            key={key}
                            product={product}
                            handleSetSelectedProduct={() => setSelectedProduct(product)}
                            status="Live"
                          />
                        ) : (
                          <></>
                        )
                      )}
                      {liveAuctionDetails?.productList.map((product, key) =>
                        product.status == "pending" ? (
                          <ProductCard
                            key={key}
                            product={product}
                            handleSetSelectedProduct={() => setSelectedProduct(product)}
                            status="Pending"
                          />
                        ) : (
                          <></>
                        )
                      )}
                      {liveAuctionDetails?.productList.map((product, key) =>
                        product.status == "sold" ? (
                          <>
                            <ProductCard
                              key={key}
                              product={product}
                              handleSetSelectedProduct={() => setSelectedProduct(product)}
                              status="Sold"
                            />
                          </>
                        ) : (
                          <></>
                        )
                      )}
                    </MDBox>
                  </Card>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} py={2}>
            {selectedProduct?.status != "pending" ? (
              <BidPage
                selectedProduct={selectedProduct}
                isHost={isHost}
                liveAuctionDetails={liveAuctionDetails}
                highestBidder={highestBidder}
                setHighestBidder={setHighestBidder}
              />
            ) : (
              <ProductDetails
                selectedProduct={selectedProduct}
                isHost={isHost}
                liveAuctionDetails={liveAuctionDetails}
              />
            )}
          </Grid>
          <Grid item xs={12} md={3} p={2} sx={{ display: "flex", flexDirection: "column" }}>
            <Card sx={{ flex: 1 }}>
              <ChatCard liveAuctionDetails={liveAuctionDetails} isHost={isHost} />
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
