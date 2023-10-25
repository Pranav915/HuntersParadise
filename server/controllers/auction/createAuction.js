const UpcomingAuction = require('../../models/UpcomingAuction');
const createAuction = (req, res) => {
    if(req.headers.from != "Ably"){
        res.status(401).send("Not authorized");
        return;
    }
    const data = JSON.parse((req.body.messages[0]).data);
    var nowauctionId = 1;
    UpcomingAuction.findOne({})
    .sort({ createdAt: -1 }) // Sort in descending order (latest first)
    .exec((err, latestAuction) => {
        if (err) {
        console.error('Error fetching latest auction:', err);
        res.status(501).send("Internal Server Error Kindly Try again");
        }

        if (latestAuction) {
            nowauctionId = latestAuction.auctionId + 1;
        } else {
            console.log('No upcoming auctions found.');
        }
    });
    const newAuction = new UpcomingAuction({
        auctionId: nowauctionId,
        auctionTitle: data.auctionTitle,
        productList: data.productList,
        auctionHost: data.userId,
        startTime: data.startTime,
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