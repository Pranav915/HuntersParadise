const DealOffers = require('../../models/DealOffers');
const editOffer = (req, res) => {
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
}
module.exports = editOffer;