const UpcomingAuction = require("../../models/UpcomingAuction");
const LiveAuction = require("../../models/LiveAuction");
const ablyService = require("../../ablyService");
const createAuction = async (req, res) => {
  const data = req.body;
  var nowauctionId = 1;
  await CompletedAuction.findOne({}).sort({auctionId: -1}).then(async (lauction) => {
    if(lauction){
      nowauctionId = lauction.auctionId + 1;
    }else{
      await LiveAuction.findOne({})
    .sort({ auctionId: -1 })
    .then(async (latestAuction) => {
      if (latestAuction) {
        nowauctionId = latestAuction.auctionId + 1;
      } else {
        await UpcomingAuction.findOne({})
          .sort({ auctionId: -1 })
          .then((latestAuction) => {
            if (latestAuction) {
              nowauctionId = latestAuction.auctionId + 1;
            } else {
              nowauctionId = 1;
            }
          });
      }
    })
    .catch((err) => {
      console.error("Error fetching latest auction:", err);
      res.status(501).send("Internal Server Error Kindly Try again");
    });
    }
  });
  
  const newAuction = new UpcomingAuction({
    auctionId: nowauctionId,
    auctionTitle: data.auctionTitle,
    auctionDescription: data.auctionDescription,
    productList: data.productList,
    auctionHost: req.user.userId,
    startTime: data.startTime,
  });
  await newAuction
    .save()
    .then((auction) => {
      var dealChannel = ablyService.client.channels.get("dealChannel");
      dealChannel.publish("AuctionCreated", {
        action: "createAuction",
        auction: auction,
      });
      res.status(200).send("Auction Created Successfully");
    })
    .catch((error) => {
      console.error("Error saving auction entry:", error);
      res.status(501).send("Internal Server Error Kindly Try again");
    });
  return;
};
module.exports = createAuction;
