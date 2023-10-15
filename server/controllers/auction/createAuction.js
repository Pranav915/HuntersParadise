const createAuction = (req, res) => {
    console.log("Hello, webhook triggered!!!");
    console.log(req.body);
}
exports.controllers = {
    createAuction,
};