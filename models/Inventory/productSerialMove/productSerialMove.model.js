const InventoryProductSerialMove = require("./inventoryProductSerialMove.schema");
const { DataResponse } = require("../../general_data.model");

// 👉 Insert/Post

exports.insertProductSerialMove = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryProductSerialMove.create(params);
    result.data == null
      ? result.doSuccess(
          0,
          "Can't insert to database, please check your request!"
        )
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    e.code == 11000 ? result.doError(6, "Serial duplicate!") : result.doError();
  }

  return result;
};
