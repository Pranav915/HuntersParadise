const User = require('../../models/User');
const getTransactions = (req, res) => {
  try{
    User.findOne({ _id: req.user.userId })
    .populate("wallet.transactions")
    .then((user) => {
      var completeTransaction = [];
      var pendingTransaction = [];
      user.wallet.transactions.forEach((trns) => {
        if(trns.status == "pending"){
          pendingTransaction.push(trns);
        }else{
          completeTransaction.push(trns);
        }
      });
      res.status(200).send({
        pendingTransaction: pendingTransaction,
        completeTransaction: completeTransaction
      });
    });
  }catch(err){
    console.log("Error while fetching transactions", err);
    res.status(501).send("Internal Server Error");
  }
};
module.exports = getTransactions;