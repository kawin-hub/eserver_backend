const InventoryProductSerial = require("./inventoryProductSerial.schema");
const { DataResponse } = require("../../general_data.model");

// 👉 Insert/Post

exports.insertProductSerial = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryProductSerial.create(params);
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

// 👉 Delete

exports.deleteOneProductSerial = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryProductSerial.deleteOne(params);
    result.data.deletedCount == 0
      ? result.doSuccess(3, "this _id isn't allowed to be removed!")
      : result.doSuccess(1);
  } catch (e) {
    result.doError();
  }

  return result;
};
