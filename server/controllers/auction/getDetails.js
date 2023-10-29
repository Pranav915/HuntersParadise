const LiveAuction = require("../../models/LiveAuction")

const getDetails = async (req, res) => {
    try{
        const auction = await LiveAuction.findOne({auctionId: req.body.auctionId});
        res.status(200).send(auction);
    }catch{
        console.log("Error while fetching auction Data", err);
        res.status(501).send("Error while fetching auction Data");
    }
}

module.exports = getDetails;