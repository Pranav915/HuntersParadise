const UpcomingAuction = require("../../models/UpcomingAuction");

const getUpcomingAuctionDetails = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const auction = await UpcomingAuction.findOne({
      auctionId: req.query.auctionId,
    });
    console.log("auction", auction);
    res.status(200).send(auction);
  } catch {
    console.log("Error while fetching auction Data", err);
    res.status(501).send("Error while fetching auction Data");
  }
};

module.exports = getUpcomingAuctionDetails;
