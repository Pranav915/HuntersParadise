const createDeal = require("./createDeal");
const getDeals = require("./getMyDeals");
const getCategoryDeals = require("./getCategoryDeals");
const giveOffer = require("./giveOffer");
const getMyOffers = require("./getMyOffers");
const revokeOffer = require("./revokeOffer");
exports.controllers = {
    createDeal,
    getDeals,
    getCategoryDeals,
    giveOffer,
    getMyOffers,
    revokeOffer,
};