const {
  Connection,
  validateConnection,
} = require("../models/Connections/Connection");
const { Market } = require("../models/MarketAndBranch/Market.js");
const { Product } = require("../models/Products/Product.js");

module.exports.models = { Connection, Market, Product };
module.exports.validators = { validateConnection };
