const { getProductsByCount, getAllFilials } = require("./socketFunctions.js");
const socketIO = (io) => {
  io.on("connection", (socket) => {
    socket.on("getProductsOfCount", async ({ market }) => {
      await getProductsByCount({
        socket,
        market,
      });
    });
    socket.on("getAllFilials", async ({ market }) => {
      await getAllFilials({
        socket,
        market,
      });
    });
  });
};

module.exports = { socketIO };
