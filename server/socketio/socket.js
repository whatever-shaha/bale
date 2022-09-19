const {
  getProductsByCount,
  getAllFilials,
  getPartnerProducts,
} = require("./socketFunctions.js");
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
    socket.on("getPartnerProducts", async ({ market, partner }) => {
      await getPartnerProducts({ socket, market, partner });
    });
  });
};

module.exports = { socketIO };
