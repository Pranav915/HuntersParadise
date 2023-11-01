const User = require('../../models/User');
const getBalance = (req, res) => {
  User.findOne({ _id: req.user.userId })
    .then((user) => {
      res.status(200).send(user.wallet);
    });
};
module.exports = getBalance;