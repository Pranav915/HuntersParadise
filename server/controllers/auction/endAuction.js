const LiveAuction = require("../../models/LiveAuction");
const ablyService = require("../../ablyService");
const UpcomingAuction = require("../../models/UpcomingAuction");
const CompletedAuction = require("../../models/CompletedAuction");
const endAuction = (req, res) => {
  LiveAuction.findOneAndDelete({
    auctionId: req.body.auctionId,
    auctionHost: req.user.userId,
  })
    .then((auction) => {
      if (auction.auctionHost != req.user.userId) {
        res
          .status(401)
          .send("Not authorized to start Auction, only hosts can.");
        return;
      }
      const newCompletedAuction = new CompletedAuction({
        auctionId: auction.auctionId,
        auctionTitle: auction.auctionTitle,
        auctionDescription: auction.auctionDescription,
        productList: auction.productList,
        auctionHost: auction.auctionHost,
        startTime: auction.startTime,
        endTime: auction.endTime,
      });
      newCompletedAuction
        .save()
        .then((endedAuction) => {
          var auctionChannel = ablyService.client.channels.get(
            "auction:" + req.body.auctionId
          );
          auctionChannel.publish("EndAuction", { action: "EndAuction" });
          var dealChannel = ablyService.client.channels.get("dealChannel");
          dealChannel.publish("EndAuction", { action: "EndAuction" });
          res.status(200).send("Auction Ended Successfully");
        })
        .catch((error) => {
          console.error("Error saving auction entry:", error);
          res.status(501).send("Internal Server Error Kindly Try again");
        });
    })
    .catch((error) => {
      console.error("Error saving auction entry:", error);
      res.status(501).send("Internal Server Error Kindly Try again");
    })
    .catch((error) => {
      console.error("Error saving auction entry:", error);
      res.status(501).send("Internal Server Error Kindly Try again");
    });
};
module.exports = endAuction;
