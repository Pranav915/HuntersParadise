import React, { useEffect } from "react";
import Navbar from "../../shared/components/Navbar";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { getMainActions } from "../../app/actions/mainActions";
import { getAuthActions } from "../../app/actions/authActions";
import { useLocation, useNavigate } from "react-router-dom";
import AuctionsCard from "./AuctionsCard";
import Wallet from "./Wallet";
import DealsCard from "./DealsCard";
import Cookies from "js-cookie";
import { initializeAblyClient } from "../../ably";

const Dashboard = ({ userDetails, setUserDetails, setClientId, clientId }) => {
  const search = useLocation().search;
  const navigate = useNavigate();

  useEffect(() => {
    const user = new URLSearchParams(search).get("user");
    if (user) {
      const data = jwt_decode(user).userDetails;
      setUserDetails(data);
      if (!data?.age) {
        navigate("/initialDetails");
      }
      Cookies.set("clientId", data?.username);
      initializeAblyClient(Cookies.get("clientId"));
    } else if (userDetails) {
      if (!userDetails.age) {
        navigate("/initialDetails");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Navbar />
      <AuctionsCard />
      <Wallet />
      <DealsCard />
    </>
  );
};

const mapStoreStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getAuthActions(dispatch),
    ...getMainActions(dispatch),
  };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(Dashboard);
