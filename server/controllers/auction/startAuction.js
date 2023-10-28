const LiveAuction = require('../../models/LiveAuction');
const ablyService = require("../../ablyService");
const UpcomingAuction = require('../../models/UpcomingAuction');
const startAuction = (req, res) => {
    UpcomingAuction.findOneAndDelete({auctionId: req.body.auctionId}).then((auction) => {
        if(auction.auctionHost != req.user.userId){
            res.status(401).send("Not authorized to start Auction, only hosts can.");
            return;
        }
        const newLiveAuction = new LiveAuction({
            auctionId: auction.auctionId,
            auctionTitle: auction.auctionTitle,
            productList: auction.productList,
            auctionHost: auction.auctionHost,
            startTime: Date.now(),
            bids: []
        });
        newLiveAuction.save()
        .then((newAuction) => {
            var dealChannel = ablyService.client.channels.get("dealChannel");
            dealChannel.publish("AuctionStarted", {action: "startAuction", auction: newAuction});
            res.status(200).send("Auction Started Successfully");
        })
        .catch((error) => { 
            console.error('Error saving auction entry:', error);
            res.status(501).send("Internal Server Error Kindly Try again");
        });
    }).catch((err)=>{
        console.error('Error saving auction entry:', error);
        res.status(501).send("Internal Server Error Kindly Try again");
    });
}
module.exports = startAuction;