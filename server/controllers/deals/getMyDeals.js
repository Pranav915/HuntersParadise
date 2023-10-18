const LiveDeals = require('../../models/LiveDeals');
const getDeals = (req, res) => {
    const userId = req.user.userId;
    LiveDeals.find({ seller: userId })
    .then((userDeals, err) => {
        if (err) {
        console.error('Error fetching user deals:', err);
        res.status(501).send("Error fetching data");
        return;
        }
        console.log(userDeals);
        res.status(200).send(userDeals);
    });
}
module.exports = getDeals;
