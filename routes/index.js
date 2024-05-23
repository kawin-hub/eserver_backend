const userAPI = require("./user.route");
const productAPI = require("./product.route");
const inventoryAPI = require("./inventory.route");
const accountAPI = require("./account.route");
const saleAPI = require("./sale.route");
const dashboardAPI = require("./dashbord.route");

module.exports = function (app) {
  app.use("/api/users", userAPI);
  app.use("/api/products", productAPI);
  app.use("/api/inventory", inventoryAPI);
  app.use("/api/account", accountAPI);
  app.use("/api/sale", saleAPI);
  app.use("/api/dashboard", dashboardAPI);
};
