const UpcomingAuction = require("../../models/UpcomingAuction");

const getUpcomingAuctions = async (req, res) => {
  try {
    const upcomingAuctions = await UpcomingAuction.find({}).populate(
      "auctionHost",
      "name email"
    );
    res.status(200).send(upcomingAuctions);
  } catch (err) {
    console.log("Error while fetching auction Data", err);
    res.status(501).send("Error while fetching auction Data");
  }
};

module.exports = getUpcomingAuctions;
