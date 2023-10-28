const LiveDeals = require("../../models/LiveDeals");
const DealOffers = require("../../models/dealOffers");
const User = require("../../models/User");
const giveOffer = async (req, res) => {
  const userId = req.user.userId;
  const deal = req.body.deal;
  const op = req.body.opt;

  if(opt == "edit"){
    DealOffers.findOneAndUpdate(
      { _id: req.body.offerId, offered_by: req.user.userId},
      { offeredPrice: req.body.newPrice },
      { new: true },
    ).then((updatedOffer) => {
        res.status(200).send("Offer updated Successfully");
        return;
    }).catch((err) => {
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

  await newOffer
    .save()
    .then((offerCreated) => {
      console.log("deal", deal);
      LiveDeals.findOneAndUpdate(
        { _id: deal },
        { $push: { offers: { offer: offerCreated._id } } },
        { new: true }
      )
        .then(async (dealUpdated) => {
          console.log("dealUpdated", dealUpdated);
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
          res.status(200).send({ userOffer: req.body.offeredPrice });
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
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error Retry");
    });
};
module.exports = giveOffer;
