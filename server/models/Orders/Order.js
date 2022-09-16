const { Schema, model } = require("mongoose");

const order = new Schema(
  {
    id: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "Market", required: true },
    market: { type: Schema.Types.ObjectId, ref: "Market", required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "OrderProduct" }],
    totalprice: { type: Number, default: 0 },
    totalpriceuzs: { type: Number, default: 0 },
    position: {
      type: String,
      required: true,
    },
    positions: [
      "received",
      "accepted",
      "canceled",
      "send",
      "delivered",
      "completed",
    ],
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports.Order = model("Order", order);
