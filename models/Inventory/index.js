const InventoryLocation = require("./inventoryLocation.schema");
const InventoryLot = require("./inventoryLot.schema");

// Inventory Location
const getAllInventoryLocations = async () => {
  var inventoryLocation = null;
  try {
    inventoryLocation = await InventoryLocation.find().lean();
  } catch (e) {
    inventoryLocation = e;
  }

  return inventoryLocation;
};

const insertInventoryLocation = async (data) => {
  var inventoryLocation = new InventoryLocation(data);
  var location = null;

  try {
    location = await inventoryLocation.save();
  } catch (e) {
    location = e;
  }

  return location;
};

const updateInventoryLocation = async (_id, update) => {
  var location = null;

  try {
    location = await InventoryLocation.findByIdAndUpdate(_id, update);
  } catch (e) {
    location = e;
  }

  return location;
};

const deleteInventoryLocation = async (data) => {
  var result = null;
  try {
    result = await InventoryLocation.findByIdAndRemove(data);
  } catch (e) {
    result = e;
  }

  return result;
};

//Inventory Lot
const getAllInventoryLot = async () => {
  var inventoryLot = null;
  try {
    inventoryLot = await InventoryLot.find().lean();
  } catch (e) {
    inventoryLot = e;
  }

  return inventoryLot;
};

const insertInventoryLot = async (data) => {
  var inventoryLot = new InventoryLot(data);
  var lot = null;

  try {
    lot = await inventoryLot.save();
  } catch (e) {
    lot = e;
  }

  return lot;
};

const deleteInventoryLot = async (data) => {
  var result = null;
  try {
    result = await InventoryLot.findByIdAndRemove(data);
  } catch (e) {
    result = e;
  }

  return result;
};

module.exports = {
  getAllInventoryLocations,
  insertInventoryLocation,
  getAllInventoryLot,
  insertInventoryLot,
  deleteInventoryLot,
  deleteInventoryLocation,
  updateInventoryLocation
};
