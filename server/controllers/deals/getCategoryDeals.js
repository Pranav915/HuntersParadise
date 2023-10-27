const LiveDeals = require("../../models/LiveDeals");
const getDeals = (req, res) => {
  const querycategory = req.query.cat;
  console.log("querycategory", querycategory);
  if (querycategory == "all") {
    LiveDeals.find({}).then((deals, err) => {
      if (err) {
        console.error("Error fetching deals:", err);
        res.status(501).send("Error fetching data");
        return;
      }
      const data = deals.map((item) => {
        var newItem = {
          _id: item._id,
          productName: item.productName,
          productImage: item.productImage,
          category: item.category,
          dealDescription: item.dealDescription,
          askPrice: item.askPrice,
          seller: item.seller,
          sellerName: item.sellerName,
          topOffer: item.topOffer
        };
        return newItem;
      });
      res.status(200).send(data);
    });
  } else {
    LiveDeals.find({ category: querycategory }).then((deals, err) => {
      if (err) {
        console.error("Error fetching deals:", err);
        res.status(501).send("Error fetching data");
        return;
      }
      const data = deals.map((item) => {
        var newItem = {
          _id: item._id,
          productName: item.productName,
          productImage: item.productImage,
          category: item.category,
          dealDescription: item.dealDescription,
          askPrice: item.askPrice,
          seller: item.seller,
          sellerName: item.sellerName,
          topOffer: item.topOffer
        };
        return newItem;
      });
      res.status(200).send(data);
    });
  }
};
module.exports = getDeals;
