const LiveAuction = require("../../models/LiveAuction");

const getLiveAuctions = async (req, res) => {
  try {
    const liveAuctions = await LiveAuction.find({}).populate(
      "auctionHost",
      "name email"
    );
    res.status(200).send(liveAuctions);
  } catch (err) {
    console.log("Error while fetching auction Data", err);
    res.status(501).send("Error while fetching auction Data");
  }
};

module.exports = getLiveAuctions;
