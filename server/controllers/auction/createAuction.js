const UpcomingAuction = require('../../models/UpcomingAuction');
const ablyService = require("../../ablyService");
const createAuction = async (req, res) => {
    const data = req.body;
    var nowauctionId = 1;
    await UpcomingAuction.findOne({})
    .sort({ createdAt: -1 }) // Sort in descending order (latest first)
    .then((latestAuction) => {
        if (latestAuction) {
            nowauctionId = latestAuction.auctionId + 1;
        } else {
            nowauctionId = 1;
        }
    }).catch((err) => {
        console.error('Error fetching latest auction:', err);
        res.status(501).send("Internal Server Error Kindly Try again");
    });
    const newAuction = new UpcomingAuction({
        auctionId: nowauctionId,
        auctionTitle: data.auctionTitle,
        productList: data.productList,
        auctionHost: req.user.userId,
        startTime: data.startTime,
    });
    await newAuction.save()
    .then((auction) => {
        var dealChannel = ablyService.client.channels.get("dealChannel");
        dealChannel.publish("AuctionCreated", {action: "createAuction", auction: auction});
        res.status(200).send("Auction Created Successfully");
    })
    .catch((error) => {
        console.error('Error saving auction entry:', error);
        res.status(501).send("Internal Server Error Kindly Try again");
    });
    return;
}
module.exports = createAuction;