const DealOffers = require('../../models/DealOffers');
const getMyOffers = (req, res) => {
    const userId = req.user.userId;
    DealOffers.find({ offered_by: userId })
    .then((userOffers, err) => {
        if (err) {
        console.error('Error fetching user deals:', err);
        res.status(501).send("Error fetching data");
        return;
        }
        console.log(userOffers);
        res.status(200).send(userOffers);
    });
}
module.exports = getMyOffers;
