const LiveAuction = require('../../models/LiveAuction');
const startAuction = (req, res) => {
    const products = req.body.auction.productList;
    const productsWithStatus = products.map(product => ({
        ...product,
        category: newCategory
    }));
    const newLiveAuction = new LiveAuction({
        auctionTitle: req.body.auction.auctionTitle,
        productList: productsWithStatus,
        auctionHost: req.body.auction.auctionHost,
        startTime: req.body.auction.startTime,
        bids: []
    });
    newLiveAuction.save()
    .then((auction) => {
        console.log('Live auction entry saved:', auction);
        res.status(200).send("Auction Started Successfully");
    })
    .catch((error) => { 
        console.error('Error saving auction entry:', error);
        res.status(501).send("Internal Server Error Kindly Try again");
    });
}
module.exports = startAuction;