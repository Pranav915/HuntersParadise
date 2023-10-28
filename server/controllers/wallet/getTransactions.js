const User = require('../../models/User');
const getTransactions = (req, res) => {
  User.findOne({ _id: req.user.userId })
    .populate("wallet.transactions")
    .then((user) => {
    console.log(user);
      res.status(200).send(user.wallet);
    });
};
module.exports = getTransactions;