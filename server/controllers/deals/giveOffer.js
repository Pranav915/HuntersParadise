const LiveDeals = require("../../models/LiveDeals");
const DealOffers = require("../../models/dealOffers");
const User = require("../../models/User");
const ablyService = require("../../ablyService");
const giveOffer = async (req, res) => {
  const userId = req.user.userId;
  const deal = req.body.deal;
  const opt = req.body.opt;

  if (opt == "edit") {
    DealOffers.findOneAndUpdate(
      { _id: req.body.offerId, offered_by: req.user.userId },
      { offeredPrice: req.body.newPrice },
      { new: true }
    )
      .populate("deal")
      .then(async (updatedOffer) => {
        const dealData = await LiveDeals.findOne({ _id: updatedOffer.deal });
        var comChannel = ablyService.client.channels.get(
          "communicationChannel:" + updatedOffer.deal.seller
        );
        comChannel.publish("OfferEdited", {
          action: "offer edit",
          offer: updatedOffer,
          deal: dealData,
        });
        console.log("Edited Offer published to Ably");
        res.status(200).send(updatedOffer);
        return;
      })
      .catch((err) => {
        console.log("Error while updating offer", err);
        res.status(501).send("Internal Server Error while updating deal offer");
      });
    return;
  }
  const newOffer = new DealOffers({
    deal: req.body.deal,
    sellerName: req.body.sellerName,
    offered_by: userId,
    offered_by_name: req.user.username,
    offeredPrice: req.body.offeredPrice,
    askedPrice: req.body.askedPrice,
  });
  var nowDeal;
  await newOffer
    .save()
    .then(async (offerCreated) => {
      await LiveDeals.findOneAndUpdate(
        { _id: deal },
        { $push: { offers: { offer: offerCreated._id } } },
        { new: true }
      )
        .then(async (dealUpdated) => {
          nowDeal = dealUpdated;
          if (
            !dealUpdated.topOffer ||
            dealUpdated.topOffer.offeredPrice < req.body.offeredPrice
          ) {
            dealUpdated.topOffer = {
              offeredPrice: req.body.offeredPrice,
              offer: offerCreated._id,
            };
            return await dealUpdated.save();
          }
          return dealUpdated;
        })
        .catch((err) => {
          console.log(err);
          DealOffers.findOneAndDelete({ _id: offerCreated._id });
          res.status(500).send("Internal Server Error Retry");
          return;
        });
      User.findOneAndUpdate(
        { _id: req.user.userId },
        { $push: { offers: { offerid: offerCreated._id } } }
      )
        .then((userUpdated) => {
          res.status(200).send(offerCreated);
          return;
        })
        .catch((err) => {
          console.log(err);
          DealOffers.findOneAndDelete({ _id: offerCreated._id });
          LiveDeals.findOneAndUpdate(
            { _id: deal },
            { $pull: { offers: { offer: offerCreated._id } } }
          );
          res.status(500).send("Internal Server Error Retry");
          return;
        });
      const dealData = await LiveDeals.findOne({ _id: newOffer.deal });
      var comChannel = ablyService.client.channels.get(
        "communicationChannel:" + nowDeal.seller
      );
      comChannel.publish("NewOffer", {
        action: "new offer",
        offer: newOffer,
        deal: dealData,
      });
      console.log("New Offer published to Ably");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error Retry");
    });
};
module.exports = giveOffer;
