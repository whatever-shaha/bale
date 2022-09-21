const { Market, Connection, TemporaryOrders, OrderProduct, OrderConnector } =
  require("../constants.js").models;

const { validateOrderProduct } = require("../constants.js").validators;
const { map, filter } = require("lodash");

// Buyurtma berish
const registerOrder = async (req, res) => {
  try {
    const { market, products, partner, totalprice, totalpriceuzs } = req.body;
    const marketData = await Market.findById(market);
    if (!marketData) {
      return res.status(400).json({ message: "Do'kon ma'lumotlari topilmadi" });
    }

    map(products, (product) => {
      const { error } = validateOrderProduct(product);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
    });

    let newProducts = [];
    let totalPrice = 0;
    let totalPriceUzs = 0;

    for (const product of products) {
      const orderProduct = new OrderProduct({
        sender: product.sender,
        market,
        product: product._id,
        productdata: product.productdata,
        category: product.category,
        unit: product.unit._id,
        pieces: { recived: product.pieces },
        unitprice: product.unitprice,
        unitpriceuzs: product.unitpriceuzs,
        totalprice: product.totalprice,
        totalpriceuzs: product.totalpriceuzs,
      });
      await orderProduct.save();
      totalPrice += orderProduct.totalprice;
      totalPriceUzs += orderProduct.totalpriceuzs;
      newProducts.push(orderProduct._id);
    }

    const countOfOrders = await OrderConnector.find({ market }).count();

    const orderConnector = new OrderConnector({
      id: countOfOrders + 1000001,
      market,
      sender: partner,
      products: newProducts,
      position: "received",
      totalprice: totalPrice,
      totalpriceuzs: totalPriceUzs,
    });
    await orderConnector.save();
    const order = await OrderConnector.findById(orderConnector._id)
      .select("products id position createdAt totalprice totalpriceuzs")
      .populate({
        path: "products",
        populate: { path: "productdata", select: "name code" },
      })
      .populate({
        path: "sender",
        select: "name inn",
      })
      .populate({
        path: "products",
        populate: { path: "category", select: "name code" },
      });

    res.status(200).json(order);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const { market, countPage, currentPage, search, startDate, endDate } =
      req.body;
    const marketData = await Market.findById(market);
    if (!marketData) {
      return res.status(404).json({ message: "Do'kon ma'lumotlari topilmadi" });
    }

    const id = new RegExp(
      ".*" + search ? search.id.toString() : "" + ".*",
      "i"
    );
    const name = new RegExp(
      ".*" + search ? search.name.toString() : "" + ".*",
      "i"
    );
    const inn = new RegExp(
      ".*" + search ? search.inn.toString() : "" + ".*",
      "i"
    );
    const orders = await OrderConnector.find({
      market,
      id: id,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select(
        "products id position createdAt totalprice totalpriceuzs position"
      )
      .populate({
        path: "products",
        populate: { path: "productdata", select: "name code" },
      })
      .populate({
        path: "sender",
        select: "name inn",
        match: { name: name },
      })
      .populate({
        path: "products",
        populate: { path: "category", select: "name code" },
      });
    const filteredOrders = filter(orders, (order) => order.sender !== null);
    const count = filteredOrders.length;
    res.status(200).json({
      orders: filteredOrders.splice(currentPage * countPage, countPage),
      count,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Vaqtincha saqlangan buyurtmalar
const registerTemporaryOrder = async (req, res) => {
  try {
    const { market, temporary } = req.body;
    const marketData = await Market.findById(market);
    if (!marketData) {
      return res.status(404).json({ message: "Do'kon ma'lumotlari topilmadi" });
    }
    const temporaryOrder = new TemporaryOrders({
      market,
      temporary,
    });
    await temporaryOrder.save();
    res.status(200).json({ message: "Buyurtma muvaffaqqiyatli saqlandi!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getTemporaryOrders = async (req, res) => {
  try {
    const { market } = req.body;
    const marketData = await Market.findById(market);
    if (!marketData) {
      return res.status(404).json({ message: "Do'kon ma'lumotlari topilmadi" });
    }
    const temporaryOrders = await TemporaryOrders.find({ market });
    if (!temporaryOrders) {
      return res
        .status(404)
        .json({ message: "Saqlangan buyurtmalar topilmadi" });
    }
    res.status(200).json({ temporaryOrders });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteTemporaryOrders = async (req, res) => {
  try {
    const { market, temporaryId } = req.body;
    const marketData = await Market.findById(market);
    if (!marketData) {
      return res.status(404).json({ message: "Do'kon ma'lumotlari topilmadi" });
    }
    await TemporaryOrders.findByIdAndDelete(temporaryId);
    res
      .status(200)
      .json({ message: "Saqlangan buyurtma muvaffaqqiyatli o'chirildi" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getOrders,
  registerOrder,
  registerTemporaryOrder,
  getTemporaryOrders,
  deleteTemporaryOrders,
};
