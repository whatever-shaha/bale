const { Market, Connection, TemporaryOrders } =
  require("../constants.js").models;

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
    return res.status(error.statusCode).json({ message: error.message });
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
    return res.status(error.statusCode).json({ message: error.message });
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
    return res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = {
  registerTemporaryOrder,
  getTemporaryOrders,
  deleteTemporaryOrders,
};
