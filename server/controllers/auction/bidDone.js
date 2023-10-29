const CompletedDeal = require('../../models/CompletedDeal');
const LiveAuction = require('../../models/LiveAuction');
const Transaction = require('../../models/Transaction');

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
      const auction = await LiveAuction.findOne({ _id: req.body.auctionId });
      if(auction.auctionHost != req.user.userId){
        res.status(401).send("You are not authorized to complete Product Sell");
        return;
      }
      if(!auction.currentProduct || auction.currentProduct == ""){
        res.status(400).send("No product to complete Bid");
        return;
      }
      const currentProductInList = auction.productList.find(
        (product) => product.product.name === auction.currentProduct
      );
      const soldData = {
        product: auction.currentProduct
      }
      if (auction.currentHighestBid.bidder) {
        soldData = {
            ...soldData,
            status: "sold",
            bidData: auction.currentHighestBid
        }
        currentProductInList.status = "sold";
        currentProductInList.highestbid = {
            highestBidder: auction.currentHighestBid.bidder,
            bidPrice: auction.currentHighestBid.bidValue,
        };
      } else {
          soldData = {
            ...soldData,
            status: "unsold"
          }
          currentProductInList.status = "unsold";
      }
      auction.currentHighestBid = {};
      auction.currentProduct = "";
      const completedDeal = new CompletedDeal({
        productName: currentProductInList.product.name,
        productImage: currentProductInList.product.image,
        dealDescription: currentProductInList.product.description,
        price: auction.currentHighestBid.bidValue,
        seller: auction.auctionHost,
        buyer: auction.currentHighestBid.bidder,
        status: "pending"
      });

      await completedDeal.save().then(async (deal) => {
        const transaction = new Transaction({
            typeOf: "transfer",
            from: auction.currentHighestBid.bidder,
            to: auction.auctionHost,
            amount: auction.currentHighestBid.bidValue,
            status: "pending",
            dealID: deal._id
          });
          await transaction.save();
      });
      
      const auctionHost = await User.findOne({_id: auction.auctionHost});
      auctionHost.wallet.totalBalance += auction.currentHighestBid.bidValue;
      auctionHost.wallet.outStandingBalance += auction.currentHighestBid.bidValue;

      await auctionHost.save();
      await auction.save();
      var auctionChannel = ablyService.client.channels.get("auction:"+ req.body.auctionId);
      auctionChannel.publish("ProductSold", {action: "Product Sold", bidData: soldData});
      res.status(200).send("Product successfully Sold");
    } catch (error) {
      console.error("Error completing bid:", error);
      return "An error occurred while completing the bid.";
    }
  }

module.exports = bidDone;
