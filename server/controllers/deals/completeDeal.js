const CategoryInfo = require('../../models/CategoryInfo');
const CompletedDeal = require('../../models/CompletedDeal');
const DealOffers = require('../../models/dealOffers');
const completedDeal = (req, res) => {
    DealOffers.findOne(
        { _id: req.body.offerId}
    ).populate("deal")
    .then((offer) => {
        const newCompletedDeal = new CompletedDeal({
            productName: offer.deal.productName,
            productImage: offer.deal.productImage,
            category: offer.deal.category,
            dealDescription: offer.deal.dealDescription,
            price: offer.offeredPrice,
            seller: req.user.userId,
            sellerName: offer.sellerName,
            buyer: offer.offered_by,
            buyerName: offer.offered_by_name,
            status: "Completed", 
          });
          newCompletedDeal.save()
          .then((newdeal) => {
            CategoryInfo.findOneAndUpdate({category: offer.deal.category},
                {$inc: { numberDeals: 1, valuation: int(offer.offeredPrice), numberLiveDeals: -1}});
            DealOffers.deleteMany({ deal: offer.deal })
            .catch((err) => {
                if (err) {
                  console.error('Error deleting offers:', err);
                  return;
                }
            });
          });
        res.status(200).send("Offer updated Successfully");
        return;
    }).catch((err) => {
        console.log("Error while Completing the Deal", err);
        res.status(501).send("Failed to Complete the Deal");
    });
}
module.exports = completedDeal;