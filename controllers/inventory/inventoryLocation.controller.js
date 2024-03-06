// 👉 Inventory model
let InventoryModel = require("../../models/Inventory");
let { upload, general } = require("../../middleware");
const fs = require("fs");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");

// 👉 Get all or by ID

exports.getInventoryLocations = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id } = req.query;
    var InventoryLocationModel = InventoryModel.location;

    if (typeof _id != "undefined") {
      result = await InventoryLocationModel.getInventoryLocationById({
        _id: _id,
      });
    } else {
      var pageOption = general.checkPageAndLimit(
        req.query.page,
        req.query.limit
      );

      var params = {
        page: pageOption.page,
        limit: pageOption.limit,
        queryCondition: {},
      };

      result = await InventoryLocationModel.getAllInventoryLocations(params);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

// 👉 Insert/Post

exports.insertInventoryLocation = async (req, res) => {
  var result = new DataResponse();
  try {
    const validation = new Validator(req.body, {
      name: "required",
      adminName: "required",
      contactNumber: "required",
      address: "required",
      googleMap: "required",
      locationStatus: "required|in:active,inactive",
    });

    const matched = await validation.check();

    var InventoryLocationModel = InventoryModel.location;

    if (matched) {
      const {
        name,
        adminName,
        contactNumber,
        address,
        googleMap,
        locationStatus,
      } = req.body;
      var insertLocationtparams = {
        name: name,
        adminName: adminName,
        contactNumber: contactNumber,
        address: address,
        googleMap: googleMap,
        status: locationStatus,
      };

      result = await InventoryLocationModel.insertInventoryLocation(
        insertLocationtparams
      );
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

// 👉 Update/Put // รอคุณกวินสอนอีกที

exports.updateInventoryLocation = async (req, res, next) => {
  var uploadRes = await upload.uploadFiles(req, res); // convert post multi-part

  let result = null;
  let message = "Update failed";
  let statusCode = 400;
  let { name, description, status, _id } = req.body;

  var InventoryLocationModel = InventoryModel.location;

  if (name !== undefined) {
    name = name ? name : "";
    description = description ? description : "";
    status = status != "" || status !== undefined ? status : "inactive";

    let dataUpdate = {
      name,
      description,
      status,
    };

    result = await InventoryLocationModel.updateInventoryLocation(
      _id,
      dataUpdate
    );

    if (result.code != 11000 && result.errors === undefined) {
      statusCode = 200;
      message = "Inventory location has updated successfully";
    } else if (result.code == 11000) {
      message = "Inventory location name is duplicate!";
    } else if (result.errors) {
      message = result.errors;
      result = [];
    } else {
      message = "Ops!!! something has gone wrong.";
    }
  } else {
    message = "name, description, active is required!";
  }

  if (statusCode != 200) {
    for (let i = 0; i < req.files.length; i++) {
      fs.rmSync(req.files[i].path, {
        force: true,
      });
    }
  }

  res.status(statusCode).send({ message, result });
};

// 👉 Delete

exports.deleteInventoryLocation = async (req, res, next) => {
  let { _id } = req.body;

  let result = null;
  let message = "Insert failed";
  let statusCode = 400;

  var InventoryLocationModel = InventoryModel.location;

  if (_id !== undefined) {
    result = await InventoryLocationModel.deleteInventoryLocation({ _id: _id });

    if (result != null) {
      statusCode = 200;
      message = "Delete inventory location successfully";
    } else {
      message = "Ops!!! something has gone wrong.";
    }
  } else {
    message = "_id is required!";
  }

  res.status(statusCode).send({ message, result });
};
