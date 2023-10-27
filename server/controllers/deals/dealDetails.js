const LiveDeals = require("../../models/LiveDeals");
const User = require("../../models/User");
const getDealDetails = (req, res) => {
    LiveDeals.findOne({ _id: req.query.dealId })
    .populate('offers.offer')
    .then((deal) => {
        if(deal.seller == req.user.userId){
            res.status(200).send({
                dealDetails: deal,
                offers: deal.offers
            });
            return;
        }
        const userHasOffered = deal.offers.some((offer) => {
            return offer.offer && offer.offer.offered_by.toString() === req.user.userId;
        });
        if(userHasOffered){
            res.status(200).send({
                dealDetails: deal,
                offer: userHasOffered
            });
            return;
        }
        res.status(200).send(deal);
    }).catch((err) => {
        console.log("Error while populating offers", err);
        res.status(501).send("Error while populating offers");
        return;
    });
};
module.exports = getDealDetails;