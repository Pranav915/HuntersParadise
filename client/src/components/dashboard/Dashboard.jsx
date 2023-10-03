import React, { useEffect } from "react";
import Navbar from "../../shared/components/Navbar";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { getMainActions } from "../../app/actions/mainActions";
import { getAuthActions } from "../../app/actions/authActions";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = ({ setUserDetails }) => {
  const search = useLocation().search;
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = new URLSearchParams(search).get("user");
    if (userDetails) {
      const data = jwt_decode(userDetails).userDetails;
      setUserDetails(data);
      if (data.age) {
        navigate("/");
      } else {
        navigate("/initialDetails");
      }
    }
  }, []);

  return (
    <>
      <Navbar />
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getAuthActions(dispatch),
    ...getMainActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(Dashboard);
