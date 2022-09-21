const { Router } = require("express");
const router = Router();
const auth = require("../../middleware/auth.middleware");

// Connections
router.post("/getmarketbyinn", auth, (req, res) => {
  require("./markets").getMarketByINN(req, res);
});

router.post("/createrequest", auth, (req, res) => {
  require("./markets").createRequestToConnection(req, res);
});

router.post("/getincomingrequests", auth, (req, res) => {
  require("./markets").incomingRequestsToConnection(req, res);
});

router.post("/getsendingrequests", auth, (req, res) => {
  require("./markets").sendingRequestsToConnection(req, res);
});

router.post("/answertorequest", auth, (req, res) => {
  require("./markets").answerToRequest(req, res);
});

router.post("/getnewrequests", auth, (req, res) => {
  require("./markets").getNewRequestToConnection(req, res);
});

router.post("/deleterequest", auth, (req, res) => {
  require("./markets").deleteRequestToConnection(req, res);
});

router.post("/getconnectionmarkets", auth, (req, res) => {
  require("./markets").getConnectionMarkets(req, res);
});

// Products
router.post("/showproduct", auth, (req, res) => {
  require("./products").showProductToConnection(req, res);
});

router.post("/getproductsbyconnection", auth, (req, res) => {
  require("./products").getProductsByConnection(req, res);
});

router.post("/showallproducts", auth, (req, res) => {
  require("./products").showAllProductsToConnection(req, res);
});

router.post("/getcheckshowall", auth, (req, res) => {
  require("./products").getCheckShowAll(req, res);
});

// Buyurtmalar
router.post("/registerorder", auth, (req, res) => {
  require("./orders").registerOrder(req, res);
});

router.post("/getorders", auth, (req, res) => {
  require("./orders").getOrders(req, res);
});

// Saqlangan buyurtmalar
router.post("/createtemporary", auth, (req, res) => {
  require("./orders").registerTemporaryOrder(req, res);
});

router.post("/gettemporaries", auth, (req, res) => {
  require("./orders").getTemporaryOrders(req, res);
});

router.post("/deletetemporary", auth, (req, res) => {
  require("./orders").deleteTemporaryOrders(req, res);
});

// Filialar
router.post("/getfilials", auth, (req, res) => {
  require("./filials").getfilials(req, res);
});

module.exports = router;
