const Transaction = require('../../models/Transaction');
const User = require('../../models/User');
const completeTransaction = async (req, res) => {
  try{
    const transaction = await Transaction.findOne({_id: req.body.transactionId});
    if(transaction.from != req.user.userId){
      res.status(401).send("Not authorized to complete the transaction.");
      return;
    }
    const buyer = await User.findOne({_id: transaction.from});
    buyer.wallet.totalBalance -= transaction.amount;
    buyer.wallet.freezedBalance -= transaction.amount;

    const seller = await User.findOne({_id: transaction.to});
    seller.wallet.availableBalance += transaction.amount;
    seller.wallet.outStandingBalance -= transaction.amount;

    transaction.status = "Completed";
    await transaction.save();
    await buyer.save();
    await seller.save();
    res.status(200).send("Transaction completed successfully");
  }catch(err){
    console.log("Error while completing the transaction", err);
    res.status(501).send("Internal server error");
  }
};
module.exports = completeTransaction;