const DealOffers = require('../../models/DealOffers');
const getMyOffers = (req, res) => {
    DealOffers.findOneAndDelete({ _id: req.body.offerid})
    .then((deletedOffer, err) => {
        if (err) {
        console.error('Error removing user deals:', err);
        res.status(501).send("Error deleting deal");
        return;
        }
        LiveDeals.findOneAndUpdate(
            { _id: req.body.dealId },
            { $pull: { offers: { offer: req.body.offerid } } },
        );
        User.findOneAndUpdate(
            {_id: req.user.userId}, 
            {$pull: {offers: {offerid: req.body.offerid}}}
        );
        console.log(deletedOffer);
        res.status(200).send(deletedOffer);
    });
}
module.exports = getMyOffers;
