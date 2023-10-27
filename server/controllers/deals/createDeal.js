const LiveDeals = require("../../models/LiveDeals");
const CategoryInfo = require("../../models/CategoryInfo");
const createDeal = (req, res) => {
  if (req.headers.from != "Pranav") {
    res.status(401).send("Not authorized");
    return;
  }
  const data = JSON.parse(req.body.messages[0].data);
  const newDeal = new LiveDeals({
    productName: data.productName,
    productImage: data.productImage,
    category: data.category,
    dealDescription: data.dealDescription,
    askPrice: data.askPrice,
    seller: data.seller,
    sellerName: data.sellerName,
  });
  newDeal
    .save()
    .then((deal) => {
      console.log("New deal entry saved:", deal);
      CategoryInfo.updateOne(
        { category: data.category },
        { $inc: { numberLiveDeals: 1 } }
      );
      res.status(200).send("Deal Created Successfully");
    })
    .catch((error) => {
      console.error("Error saving deal entry:", error);
      res.status(501).send("Internal Server Error Kindly Try again");
    });
};
module.exports = createDeal;
