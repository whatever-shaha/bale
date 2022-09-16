const { Schema, model } = require("mongoose");
const Joi = require("joi");

const orderproduct = new Schema(
  {
    id: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "Market", required: true },
    market: { type: Schema.Types.ObjectId, ref: "Market", required: true },
    products: { type: Schema.Types.ObjectId, ref: "Product" },
    productdata: { type: Schema.Types.ObjectId, ref: "ProductData" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    unit: { type: Schema.Types.ObjectId, ref: "Unit" },
    pieces: {
      recived: { type: Number, default: 0 },
      send: { type: Number, default: 0 },
      delivered: { type: Number, default: 0 },
      returned: { type: Number, default: 0 },
    },
    unitprice: { type: Number, default: 0 },
    unitpriceuzs: { type: Number, default: 0 },
    totalprice: { type: Number, default: 0 },
    totalpriceuzs: { type: Number, default: 0 },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

function validateOrderProduct(orderproduct) {
  const schema = Joi.object({
    sender: Joi.string().required(),
    market: Joi.string().required(),
    product: Joi.string().required(),
    productdata: Joi.string().required(),
    category: Joi.string().required(),
    unit: Joi.string().required(),
    pieces: Joi.object(),
    unitprice: Joi.number(),
    unitpriceuzs: Joi.number(),
    totalprice: Joi.number(),
    totalpriceuzs: Joi.number(),
  });

  return schema.validate(orderproduct);
}

module.exports.validateOrderProduct = validateOrderProduct;
module.exports.OrderProduct = model("OrderProduct", orderproduct);
