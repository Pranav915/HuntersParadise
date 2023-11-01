const LiveAuction = require("../../models/LiveAuction");
const UpcomingAuction = require("../../models/UpcomingAuction");

const getMyAuctions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const liveAuctions = await LiveAuction.find({ auctionHost: userId });
    const upcomingAuctions = await UpcomingAuction.find({
      auctionHost: userId,
    });
    res
      .status(200)
      .send({ liveAuctions: liveAuctions, upcomingAuctions: upcomingAuctions });
  } catch {
    console.log("Error while fetching auction Data", err);
    res.status(501).send("Error while fetching auction Data");
  }
};

module.exports = getMyAuctions;
