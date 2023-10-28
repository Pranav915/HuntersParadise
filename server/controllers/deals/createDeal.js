const LiveDeals = require("../../models/LiveDeals");
const CategoryInfo = require("../../models/CategoryInfo");
const ablyService = require("../../ablyService");
const createDeal = (req, res) => {
  const data = req.body;
  const newDeal = new LiveDeals({
    productName: data.productName,
    productImage: data.productImage,
    category: data.category,
    dealDescription: data.dealDescription,
    askPrice: data.askPrice,
    seller: req.user.userId,
    sellerName: data.sellerName,
    topOffer: {
      offeredPrice: 0,
      offer: null,
    },
  });
  newDeal
    .save()
    .then(async (deal) => {
      console.log("New deal entry saved:", deal);
      await CategoryInfo.updateOne(
        { category: data.category },
        { $inc: { numberLiveDeals: 1 } }
      );
      var dealChannel = ablyService.client.channels.get("dealChannel");
      dealChannel.publish("DealCreated", {action: "create", deal: deal});
      console.log("Deal Completed Published to Ably");
      res.status(200).send("Deal Created Successfully");
    })
    .catch((error) => {
      console.error("Error saving deal entry:", error);
      res.status(501).send("Internal Server Error Kindly Try again");
    });
};
module.exports = createDeal;
