const Transaction = require('../../models/Transaction');
const User = require('../../models/User');
const withdrawFund = (req, res) => {
  User.findOne({_id: req.user.userId}).then((user) => {
    if(user.wallet.availableBalance < req.body.amount){
        res.status(400).send("Not enough Balance in your wallet");
        return;
    }
    const newTransaction = new Transaction({
        typeOf: "withdrawFunds",
        amount: req.body.amount,
        from: req.user.userId
      });
      newTransaction.save().then((trns) => {
        User.findOneAndUpdate({ _id: req.user.userId }, 
          {$inc: {'wallet.availableBalance': -1*req.body.amount, 'wallet.totalBalance': -1*req.body.amount}, $push: {'wallet.transactions': trns._id}},
          {new: true}
          ).then((user) => {
            res.status(200).send(user.wallet);
            return;
        }).catch((err)=>{
          console.log("Error while withdrawing funds", err);
          res.status(501).send("Error while withdrawing the funds");
        });
      }).catch((err)=>{
        console.log("Error while adding the transaction", err);
        res.status(501).send("Error while adding the transaction");
      });
  }).catch((err) => {
    console.log("Internal server error", err);
    res.status(501).send("Internal Server Error, please try again");
  })
};
module.exports = withdrawFund;