const LiveAuction = require('../../models/LiveAuction');
const User = require("../../models/User");
const ablyService = require("../../ablyService");
const newBid = (req, res) => {

  const bidder = req.user.userId;
  const bidValue = req.body.bidValue;
  const newBidData = {
    bidder: bidder,
    bidValue: bidValue,
  };
  
  User.findOne({ _id: bidder }).then((user) => {
    if (user.wallet.availableBalance >= bidValue) {
      User.findOneAndUpdate(
        { _id: bidder },
        {
          $set: {
            'wallet.availableBalance': user.wallet.availableBalance - bidValue,
            'wallet.freezedBalance': user.wallet.freezedBalance + bidValue,
          },
        }
      ).catch((err) => {
        console.log("Error while updating user Balance", err);
      })
    } else {
      console.log('User does not have the required available balance.');
      res.status(400).send("You do not have enough amount in wallet")
    }
  });
  
  LiveAuction.findOne({ _id: req.body.auctionId }, {}, { sort: { "bids.raisedAt": -1 } })
  .populate({
    path: 'bids.bidder',
  }).then((auction) => {
    const mostRecentBid = auction.bids[0];
    if (mostRecentBid) {
      User.findOneAndUpdate(
        { _id: mostRecentBid.bidder },
        {
          $set: {
            'wallet.availableBalance': mostRecentBid.bidder.wallet.availableBalance + mostRecentBid.bidValue,
            'wallet.freezedBalance': mostRecentBid.bidder.wallet.freezedBalance - mostRecentBid.bidValue,
          },
        }
      ).catch((err) => {
        console.log("Error while updating user Balance", err);
      })
    }
  }).catch((err) => {
    console.log("Error while unfreezing the amount", err);
  });


  LiveAuction.updateOne(
    { auctionId: req.body.auctionId },
    { $push: { bids: newBidData } }
  ).then((success) => {
      var dealChannel = ablyService.client.channels.get("auction:"+ req.body.auctionId);
      dealChannel.publish("NewBid", {action: "newBid", bidData: newBidData});
      res.status(200).send(newBidData);
      return;
  }).catch((err) => {
      console.error('Error updating auction with a new bid:', err);
      res.status(501).send("Error while registering the bid");
      return;
  });
}
module.exports = newBid;