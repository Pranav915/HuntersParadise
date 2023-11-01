const DealOffers = require('../../models/dealOffers');
const ablyService = require("../../ablyService");
const editOffer = (req, res) => {
    DealOffers.findOneAndUpdate(
        { _id: req.body.offerId, sellerName: req.user.username },
        { askedPrice: req.body.newPrice },
        { new: true },
    ).then((updatedOffer) => {
        var comChannel = ablyService.client.channels.get("communicationChannel:" + updatedOffer.offered_by);
        comChannel.publish("OfferNegotiated", {action: "negotiate offer", Offer: updatedOffer});
        console.log("Negotiated Offer published to Ably");
        res.status(200).send("Offer updated Successfully");
        return;
    }).catch((err) => {
        console.log("Error while updating offer", err);
        res.status(501).send("Failed to update");
    });
}
module.exports = editOffer;
