const LiveDeals = require('../../models/LiveDeals');
const createDeal = (req, res) => {
    if(req.headers.from != "Pranav"){
        res.status(401).send("Not authorized");
    }
    const data = (req.body.messages[0]).data;
    const newDeal = new LiveDeals({
        productName: data.get("productName"),
        productImage: data.get("productImage"),
        category: data.get("category"),
        dealDescription: data.get("dealDescription"),
        askPrice: data.get("askPrice"),
        seller: data.get(seller),
        sellerName: data.get("sellerName"),
    });
    newDeal.save()
    .then((deal) => {
        console.log('New deal entry saved:', deal);
        res.status(200).send("Deal Created Successfully");
    })
    .catch((error) => {
        console.error('Error saving deal entry:', error);
        res.status(501).send("Internal Server Error Kindly Try again");
    });

}
module.exports = createDeal;