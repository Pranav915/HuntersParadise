const createAuction = (req, res) => {
    console.log(req.headers);
    console.log(req.body);
    res.send("Done");
}
exports.controllers = {
    createAuction,
};
