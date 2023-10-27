const LiveAuction = require('../../models/LiveAuction');
const newBid = (req, res) => {
    if(req.headers.from != "Ably"){
        res.status(401).send("Not authorized");
        return;
    }
    const data = JSON.parse((req.body.messages[0]).data);
const newBidData = {
  bidder: data.bidder,
  bidValue: data.bidValue,
};

LiveAuction.updateOne(
  { auctionId: data.auctionId },
  { $push: { bids: newBidData } }
).then((success) => {
    res.status(200).send("new bid added");
    return;
}).catch((err) => {
    console.error('Error updating auction with a new bid:', err);
    res.status(501).send("Error while registering the bid");
    return;
});
}
module.exports = newBid;