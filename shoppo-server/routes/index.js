const UserRouter = require("./UserRouters");
const ProductRouter = require("./ProductRouters");
const OrderRouter = require("./OrderRouters");
const CartRouter = require("./CartRouters");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/order", OrderRouter);
  app.use("/api/cart", CartRouter);
};

module.exports = routes;
