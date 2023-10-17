const UpcomingAuction = require('../../models/UpcomingAuction');
const createAuction = (req, res) => {
    const newAuction = new UpcomingAuction({
        auctionTitle: req.body.title,
        productList: req.body.products,
        auctionHost: req.user.userId,
        startTime: req.body.startTime,
    });
    newAuction.save()
    .then((auction) => {
        console.log('New auction entry saved:', auction);
        res.status(200).send("Auction Created Successfully");
    })
    .catch((error) => {
        console.error('Error saving auction entry:', error);
        res.status(501).send("Internal Server Error Kindly Try again");
    });

}
module.exports = createAuction;