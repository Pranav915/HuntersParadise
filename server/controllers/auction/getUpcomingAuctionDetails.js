const UpcomingAuction = require("../../models/UpcomingAuction");

const getUpcomingAuctionDetails = async (req, res) => {
  try {
    console.log("req.body", req.body);
    let isHost = false;
    const auction = await UpcomingAuction.findOne({
      auctionId: req.query.auctionId,
    }).populate("auctionHost", "name email profilePhoto");
    if (auction.auctionHost._id == req.user.userId) {
      isHost = true;
    }
    console.log("auction", auction);
    res.status(200).send({ isHost, auction });
  } catch (err) {
    console.log("Error while fetching auction Data", err);
    res.status(501).send("Error while fetching auction Data");
  }
};

module.exports = getUpcomingAuctionDetails;
