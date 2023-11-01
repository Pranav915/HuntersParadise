/* eslint-disable react/prop-types */

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Code Pulse React components
import MDBox from "components/MDBox";

// Code Pulse React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Code Pulse React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Code Pulse React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Code Pulse React routes
import routes from "routes";

// Code Pulse React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import { connect } from "react-redux";
import { useChannel } from "ably/react";
import { getDealActions } from "app/actions/dealActions";
import * as Ably from "ably";
import { realtime } from "ably.js";
import { initializeAblyClient } from "./ably.js";
import { getActions } from "app/actions/alertActions.js";

const App = ({
  userDetails,
  totalLiveDealsCount,
  setTotalLiveDealsCount,
  categoryLiveDealsCount,
  setCategoryLiveDealsCount,
  openAlertMessage,
}) => {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const [newRoutes, setNewRoutes] = useState(routes);
  const { pathname } = useLocation();

  const dealChannel = useChannel("dealChannel", (message) => {
    console.log("message", message);
    if (message.name == "AuctionCreated") {
      openAlertMessage({
        title: "Auction Alert!",
        content: `Gear up for a new auction. ${message.data.auction.auctionTitle}`,
        link: `/auctionDetail/${message.data.auction.auctionTitle}`,
        item: message.data.auction,
      });
    }
  }).channel;

  const comChannel = useChannel("communicationChannel:" + userDetails?.userId, (message) => {
    console.log("message", message);
    if (message.name == "NewOffer") {
      // Show Notification (New Offer Received On your Deal: Deal Name)
      openAlertMessage({
        title: "Offer Alert!",
        content: `Hey, Somebody's interested in your deal. New Offer of $ ${message.data.offer.offeredPrice} Received.`,
        link: `/dealDetail/${message.data.deal.productName}`,
        item: message.data.deal,
      });
    } else if (message.name == "OfferEdited") {
      openAlertMessage({
        title: "Offer Alert!",
        content: `Hey, Somebody has edited their previous offer to $ ${message.data.offer.offeredPrice}`,
        link: `/dealDetail/${message.data.deal.productName}`,
        item: message.data.deal,
      });
    } else if (message.name == "GotIt") {
      openAlertMessage({
        title: "Congratulations!",
        content: `Your Offer Has Been Accepted on ${message.data.deal.productName}`,
        link: `/dealDetail/${message.data.deal.productName}`,
        item: message.data.deal,
      });
    }
  }).channel;
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  useEffect(() => {
    initializeAblyClient(userDetails?.username);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    const tempRoutes = routes.filter((route) => {
      if (userDetails?.username) {
        return route.name !== "Sign In" && route.name !== "Sign Up";
      } else {
        return route.name !== "Logout";
      }
    });
    setNewRoutes(tempRoutes);
  }, [userDetails]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Hunter's Paradise"
              routes={newRoutes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Hunter's Paradise"
            routes={newRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
};

const mapStoreStateToProps = ({ auth, deal }) => {
  return {
    ...auth,
    ...deal,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getDealActions(dispatch),
    ...getActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(App);
