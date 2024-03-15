//Sale model
let SaleModel = require("../../models/Sale");
let { general } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");

// 👉 Get CustomerLevel all or by ID

exports.getCustomerLevels = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id } = req.query;

    var SaleLeadModel = SaleModel.lead;

    if (typeof _id != "undefined") {
      result = await SaleLeadModel.getCustomerLevelById({
        _id: new Object(_id),
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

      result = await SaleLeadModel.getAllCustomerLevels(params);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

// 👉 Get all or by ID

exports.getSaleLeads = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id } = req.query;

    var SaleLeadModel = SaleModel.lead;

    if (typeof _id != "undefined") {
      result = await SaleLeadModel.getSaleLeadById({
        _id: new Object(_id),
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

      result = await SaleLeadModel.getAllSaleLeads(params);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

// 👉 Insert/Post

exports.insertSaleLead = async (req, res) => {
  var result = new DataResponse();

  try {
    const validation = new Validator(req.body, {
      companyName: "required",
      firstname: "required",
      contactNumber: "required",
      level: "required|in:low prudential,middle prudential,high prudential",
      customerLevel_id: "required",
    });

    const matched = await validation.check();

    if (matched) {
      const {
        companyName,
        firstname,
        contactNumber,
        level,
        customerLevel_id,
        taxId,
        branch,
        address,
        googleMap,
        companyEmail,
        companyContactNumber,
        lastname,
        lineId,
        tag,
      } = req.body;

      const userData = req.body.authData.userInfo.userData;

      const CustomerLevelResult = await SaleModel.lead.getCustomerLevelById(
        { _id: customerLevel_id },
        {
          _id: 1,
          level: 1,
        }
      );

      if (CustomerLevelResult.code == 1) {
        var insertLeadparams = {
          companyName: companyName,
          taxId: typeof taxId != "undefined" ? taxId : "",
          branch: typeof branch != "undefined" ? branch : "",
          address: typeof address != "undefined" ? address : "",
          googleMap: typeof googleMap != "undefined" ? googleMap : "",
          companyEmail: typeof companyEmail != "undefined" ? companyEmail : "",
          companyContactNumber:
            typeof companyContactNumber != "undefined"
              ? companyContactNumber
              : "",
          firstname: firstname,
          lastname: typeof lastname != "undefined" ? lastname : "",
          contactNumber: contactNumber,
          lineId: typeof lineId != "undefined" ? lineId : "",
          level: level,
          customerLevel: {
            customerLevel_id: CustomerLevelResult.data._id,
            level: CustomerLevelResult.data.level,
          },
          tag: typeof tag != "undefined" ? tag : "",
          createdBy: {
            user_id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
        };

        result = await SaleModel.lead.insertSaleLead(insertLeadparams);
      } else {
        result.doError(5, "customerLevel_id is not found!");
      }
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
  }
  res.json(result);
};

exports.updateSaleLead = async (req, res) => {
  var result = new DataResponse();

  try {
    const validation = new Validator(req.body, {
      _id: "required",
    });

    const matched = await validation.check();

    if (matched) {
      const {
        _id,
        companyName,
        firstname,
        contactNumber,
        level,
        customerLevel_id,
        address,
      } = req.body;

      var customerLevelInfo = null;

      if (typeof customerLevel_id !== "undefined") {
        //check DB
        customerLevelInfo = await SaleModel.lead.getCustomerLevelById({
          _id: customerLevel_id,
        });
      }

      //update
      const updateConditions = {
        _id: _id,
      };
      var params = {};
      if (companyName) params.companyName = companyName;
      if (firstname) params.firstname = firstname;
      if (level) params.level = level;
      if (contactNumber) params.contactNumber = contactNumber;
      if (address) params.address = address;
      if (customerLevelInfo.data) {
        params.customerLevel = {
          customerLevel_id: customerLevelInfo.data._id,
        };
      }

      result = await SaleModel.lead.updateSaleLead(updateConditions, params);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

exports.deleteSaleLead = async (req, res) => {
  const { _id } = req.body;
  try {
    var result = new DataResponse();
    if (typeof _id != "undefined") {
      result = await SaleModel.lead.deleteSaleLead({ _id: _id });
    } else {
      result.doError(2, "_id is required.");
    }
  } catch (e) {
    console.log(e);
  }

  res.json(result);
};
