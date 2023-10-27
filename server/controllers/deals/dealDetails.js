const LiveDeals = require("../../models/LiveDeals");
const User = require("../../models/User");
const getDealDetails = (req, res) => {
  LiveDeals.findOne({ _id: req.query.dealId })
    .populate("offers.offer")
    .populate("seller")
    .then((deal) => {
      console.log("deal.seller", deal.seller._id);
      console.log("req.user.userId", req.user.userId);
      if (deal.seller._id == req.user.userId) {
        res.status(200).send({
          isSeller: true,
          dealDetails: deal,
          offer: false,
        });
        return;
      }
      const userHasOffered = deal.offers.some((offer) => {
        return (
          offer.offer && offer.offer.offered_by.toString() === req.user.userId
        );
      });
      if (userHasOffered) {
        res.status(200).send({
          isSeller: false,
          dealDetails: deal,
          offer: userHasOffered,
        });
        return;
      }
      res.status(200).send({
        isSeller: false,
        dealDetails: deal,
        offer: false,
      });
    })
    .catch((err) => {
      console.log("Error while populating offers", err);
      res.status(501).send("Error while populating offers");
      return;
    });
};
module.exports = getDealDetails;
