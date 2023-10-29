const createAuction = require("./createAuction");
const startAuction = require("./startAuction");
const newBid = require("./newBid");
const bidDone = require("./bidDone");
const getDetails = require("./getDetails");
const startProduct = require("./startProduct");
const getLiveAuctions = require("./getLiveAuctions");
const getUpcomingAuctions = require("./getUpcomingAuctions");
const getMyAuctions = require("./getMyAuctions");
const getUpcomingAuctionDetails = require("./getUpcomingAuctionDetails");
exports.controllers = {
  createAuction,
  startAuction,
  newBid,
  bidDone,
  getDetails,
  startProduct,
  getLiveAuctions,
  getUpcomingAuctions,
  getMyAuctions,
  getUpcomingAuctionDetails,
};
