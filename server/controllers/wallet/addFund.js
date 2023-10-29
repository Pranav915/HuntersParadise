const Transaction = require('../../models/Transaction');
const User = require('../../models/User');
const addFund = (req, res) => {
  const newTransaction = new Transaction({
    typeOf: "addFunds",
    amount: req.body.amount,
    to: req.user.userId
  });
  newTransaction.save().then((trns) => {
    User.findOneAndUpdate({ _id: req.user.userId }, 
      {$inc: {'wallet.availableBalance': req.body.amount, 'wallet.totalBalance': req.body.amount}, $push: {'wallet.transactions': trns._id}},
      {new: true}
      ).then((user) => {
        res.status(200).send(user.wallet);
        return;
    }).catch((err)=>{
      console.log("Error while adding the funds", err);
      res.status(501).send("Error while adding the funds");
    });
  }).catch((err)=>{
    console.log("Error while adding the transaction", err);
    res.status(501).send("Error while adding the transaction");
  });
};
module.exports = addFund;