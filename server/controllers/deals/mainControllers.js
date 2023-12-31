const createDeal = require("./createDeal");
const getDeals = require("./getMyDeals");
const getCategoryDeals = require("./getCategoryDeals");
const giveOffer = require("./giveOffer");
const getMyOffers = require("./getMyOffers");
const revokeOffer = require("./revokeOffer");
const editOffer = require("./editOffer");
const negotiateDeal = require("./negotiateDeal");
const completeDeal = require("./completeDeal");
const getDealDetails = require("./dealDetails");

exports.controllers = {
    createDeal,
    getDeals,
    getCategoryDeals,
    giveOffer,
    getMyOffers,
    revokeOffer,
    editOffer,
    negotiateDeal,
    completeDeal,
    getDealDetails
};