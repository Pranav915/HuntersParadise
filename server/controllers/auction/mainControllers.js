const createAuction = require("./createAuction");
const startAuction = require("./startAuction");
const newBid = require("./newBid");
const bidDone = require("./bidDone");
const getDetails = require("./getDetails");
exports.controllers = {
    createAuction,
    startAuction,
    newBid,
    bidDone,
    getDetails
};