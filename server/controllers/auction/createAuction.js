const UpcomingAuction = require('../../models/UpcomingAuction');
const createAuction = (req, res) => {
    UpcomingAuction.findOne({})
    .sort({ createdAt: -1 }) // Sort in descending order (latest first)
    .exec((err, latestAuction) => {
        if (err) {
        console.error('Error fetching latest auction:', err);
        res.status(501).send("Internal Server Error Kindly Try again");
        }

        if (latestAuction) {
        console.log('Latest auction:', latestAuction);
        } else {
        console.log('No upcoming auctions found.');
        }
    });
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