const LiveAuction = require('../../models/LiveAuction');

const bidDone = (req, res) => {
    const productNameToUpdate = data.productName;
    const productSold = true;

    LiveAuction.findOne({ auctionId: req.body.auctionId }).then(
        (auction) => {
            if (!auction) {
                console.log('Auction not found.');
                return;
            }
        
            const highestBid = auction.bids.sort((a, b) => b.bidValue - a.bidValue)[0];
        
            const productIndex = auction.productList.findIndex((product) => product.product.name === auction.currentProduct);
        
            if (productIndex !== -1) {
                auction.productList[productIndex].status = 'Sold';
                auction.productList[productIndex].highestbid.highestBidder = highestBid.bidder;
                auction.productList[productIndex].highestbid.bidPrice = highestBid.bidValue;
            } else {
                console.log('Product not found in the productList.');
                return;
            }
        
            auction.save().then((success) => {
                res.status(200).send("Successfully sold");
            }).catch((err) => {
                console.log("Error while selling the product", err);
                res.send(501).send("Error while updating product status");
            });
            }
    );
};

module.exports = bidDone;
