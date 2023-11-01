const LiveAuction = require("../../models/LiveAuction");
const ablyService = require("../../ablyService");
const startProduct = async (req, res) => {
  try {
    const auction = await LiveAuction.findOne({ _id: req.body.auctionId });
    if (auction.auctionHost != req.user.userId) {
      res.status(401).send("You are not authorized to complete Product Sell");
      return;
    }
    if (auction.currentProduct && auction.currentProduct !== "") {
      res.status(400).send("Already a product on auction");
      return;
    }
    const wantedProduct = auction.productList.find(
      (product) => product.product.name === req.body.productName
    );
    if (wantedProduct && wantedProduct.status == "pending") {
      auction.currentProduct = req.body.productName;
      auction.currentHighestBid = {};
      wantedProduct.status = "live";
      await auction.save();
      var auctionChannel = ablyService.client.channels.get(
        "auction:" + req.body.auctionId
      );
      auctionChannel.publish("ProductStart", {
        action: "Product start",
        product: wantedProduct,
      });
      res.status(200).send("Product now on auction");
    } else {
      res.status(400).send("Product already sold or not found");
    }
  } catch {
    res.status(501).send("Internal Server Error, kindly retry");
  }
};

module.exports = startProduct;
