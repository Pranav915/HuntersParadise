const DealOffers = require('../../models/dealOffers');
const editOffer = (req, res) => {
    DealOffers.findOneAndUpdate(
        { _id: req.body.offerId, sellerName: req.user.username },
        { askedPrice: req.body.newPrice },
        { new: true },
    ).then((updatedOffer) => {
        res.status(200).send("Offer updated Successfully");
        return;
    }).catch((err) => {
        console.log("Error while updating offer", err);
        res.status(501).send("Failed to update");
    });
}
module.exports = editOffer;
