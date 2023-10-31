const userAPI = require("./user.route");
const productAPI = require("./product.route");
const inventoryAPI = require("./inventory.route");

module.exports = function (app) {
  app.use("/api/users", userAPI);
  app.use("/api/products", productAPI);
  app.use("/api/inventory", inventoryAPI);
};
