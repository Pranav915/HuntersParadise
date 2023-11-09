const CompletedDeal = require("../../models/CompletedDeal");
const LiveAuction = require("../../models/LiveAuction");
const Transaction = require("../../models/Transaction");
const User = require("../../models/User");
const ablyService = require("../../ablyService");

// const bidDone = (req, res) => {
//     LiveAuction.findOne({ auctionId: req.body.auctionId }).then(
//         (auction) => {
//             if (!auction) {
//                 console.log('Auction not found.');
//                 return;
//             }
//             const highestBid = auction.bids.sort((a, b) => b.bidValue - a.bidValue)[0];
//             const productIndex = auction.productList.findIndex((product) => product.product.name === auction.currentProduct);
//             if (productIndex !== -1) {
//                 auction.productList[productIndex].status = 'Sold';
//                 auction.productList[productIndex].highestbid.highestBidder = highestBid.bidder;
//                 auction.productList[productIndex].highestbid.bidPrice = highestBid.bidValue;
//             } else {
//                 console.log('Product not found in the productList.');
//                 return;
//             }
//             auction.save().then((success) => {
//                 res.status(200).send("Successfully sold");
//             }).catch((err) => {
//                 console.log("Error while selling the product", err);
//                 res.status(501).send("Error while updating product status");
//             });
//             }
//     );
// };

const bidDone = async (req, res) => {
  try {
    const auction = await LiveAuction.findOne({
      auctionId: req.body.auctionId,
    }).populate("auctionHost").populate("currentHighestBid.bidder");
    if (!auction) {
      res.status(404).send("No such Auction found");
      return;
    }
    if (auction.auctionHost._id != req.user.userId) {
      res.status(401).send("You are not authorized to complete Product Sell");
      return;
    }
    if (!auction.currentProduct || auction.currentProduct == "") {
      res.status(400).send("No product to complete Bid");
      return;
    }
    const currentProductInList = auction.productList.find(
      (product) => product.product.name === auction.currentProduct
    );
    var soldData = {
      product: auction.currentProduct,
    };
    if (auction.currentHighestBid.bidder) {
      soldData = {
        ...soldData,
        status: "sold",
        bidData: auction.currentHighestBid,
      };
      currentProductInList.status = "sold";
      currentProductInList.highestbid = {
        highestBidder: auction.currentHighestBid.bidder,
        bidPrice: auction.currentHighestBid.bidValue,
      };
      const completedDeal = new CompletedDeal({
        productName: currentProductInList.product.name,
        productImage: currentProductInList.product.image,
        dealDescription: currentProductInList.product.description,
        price: auction.currentHighestBid.bidValue,
        seller: auction.auctionHost._id,
        buyer: auction.currentHighestBid.bidder,
        status: "pending",
      });

      await completedDeal.save().then(async (deal) => {
        const transaction = new Transaction({
          typeOf: "transfer",
          from: auction.currentHighestBid.bidder,
          to: auction.auctionHost._id,
          amount: auction.currentHighestBid.bidValue,
          reciever_name: auction.auctionHost.name,
          sender_name: auction.currentHighestBid.bidder.name,
          status: "pending",
          dealID: deal._id,
        });
        await transaction.save().then(async (trns) => {
          const auctionHost = await User.findOne({ _id: auction.auctionHost._id });
          auctionHost.wallet.totalBalance += parseInt(
            auction.currentHighestBid.bidValue
          );
          auctionHost.wallet.outStandingBalance += parseInt(
            auction.currentHighestBid.bidValue
          );
          auctionHost.wallet.transactions.push(trns._id);
          await auctionHost.save();

          const buyer = await User.findOne({
            _id: auction.currentHighestBid.bidder,
          });
          buyer.wallet.transactions.push(trns._id);
          await buyer.save();
        });
      });
    } else {
      soldData = {
        ...soldData,
        status: "unsold",
      };
      currentProductInList.status = "unsold";
    }
    auction.currentHighestBid = {};
    auction.currentProduct = "";

    await auction.save();
    var auctionChannel = ablyService.client.channels.get(
      "auction:" + req.body.auctionId
    );
    auctionChannel.publish("ProductSold", {
      action: "Product Complete",
      bidData: soldData,
    });
    return res.status(200).send("Product successfully Auctioned");
  } catch (error) {
    console.error("Error completing bid:", error);
    return "An error occurred while completing the bid.";
  }
  res.status(500).send("Something went wrong");
};

module.exports = bidDone;
