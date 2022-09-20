const {
  Connection,
  validateConnection,
} = require("../models/Connections/Connection");
const { Market } = require("../models/MarketAndBranch/Market.js");
const { Product } = require("../models/Products/Product.js");
const { ProductPrice } = require("../models/Products/ProductPrice.js");
const { Category } = require("../models/Products/Category.js");
const { Order } = require("../models/Orders/Order.js");
const { OrderProduct } = require("../models/Orders/OrderProduct.js");
const { TemporaryOrders } = require("../models/Orders/TemporaryOrders.js");

module.exports.models = {
  Connection,
  Market,
  Product,
  TemporaryOrders,
  ProductPrice,
  Order,
  OrderProduct,
  Category,
};
module.exports.validators = { validateConnection };
