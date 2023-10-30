const LiveAuction = require("../../models/LiveAuction");

const getLiveAuctionDetails = async (req, res) => {
  try {
    let isHost = false;
    const auction = await LiveAuction.findOne({
      auctionId: req.query.auctionId,
    }).populate("auctionHost", "email name profilePhoto");
    if (auction?.auctionHost?._id == req.user.userId) {
      isHost = true;
    }
    res.status(200).send({ isHost, auction });
  } catch {
    console.log("Error while fetching auction Data", err);
    res.status(501).send("Error while fetching auction Data");
  }
};

module.exports = getLiveAuctionDetails;
