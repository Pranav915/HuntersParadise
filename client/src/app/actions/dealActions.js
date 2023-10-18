export const dealActions = {
  SET_CREATED_DEALS: "DEAL.SET_CREATED_DEALS",
  SET_PARTICIPATED_DEALS: "DEAL.SET_PARTICIPATED_DEALS",
  SET_ALL_DEALS: "DEAL.SET_ALL_DEALS",
};

export const getDealActions = (dispatch) => {
  return {
    setCreatedDeals: (data) => dispatch(setCreatedDeals(data)),
    setParticipatedDeals: (data) => dispatch(setParticipatedDeals(data)),
    setAllDeals: (data) => dispatch(setAllDeals(data)),
  };
};

export const setCreatedDeals = (data) => {
  return {
    type: dealActions.SET_CREATED_DEALS,
    data,
  };
};

export const setParticipatedDeals = (data) => {
  return {
    type: dealActions.SET_PARTICIPATED_DEALS,
    data,
  };
};

export const setAllDeals = (data) => {
  return {
    type: dealActions.SET_ALL_DEALS,
    data,
  };
};
