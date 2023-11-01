const createAuction = require("./createAuction");
const startAuction = require("./startAuction");
const newBid = require("./newBid");
const bidDone = require("./bidDone");
const startProduct = require("./startProduct");
const getLiveAuctions = require("./getLiveAuctions");
const getUpcomingAuctions = require("./getUpcomingAuctions");
const getMyAuctions = require("./getMyAuctions");
const getUpcomingAuctionDetails = require("./getUpcomingAuctionDetails");
const getLiveAuctionDetails = require("./getLiveAuctionDetails");
const endAuction = require("./endAuction");
exports.controllers = {
  createAuction,
  startAuction,
  newBid,
  bidDone,
  startProduct,
  getLiveAuctions,
  getUpcomingAuctions,
  getMyAuctions,
  getUpcomingAuctionDetails,
  getLiveAuctionDetails,
  endAuction
};
