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

// 👉 Post/Insert

exports.insertSaleLead = async (req, res) => {
  var result = new DataResponse();

  try {
    const validation = new Validator(req.body, {
      level: "required|in:low prudential,middle prudential,high prudential",
      customerLevel_id: "required",
      companyInfo: "array", // Validate as array
      "companyInfo.*.companyName": "required",
      "companyInfo.*.companyEmail": "email",
      "companyInfo.*.firstname": "required",
      "companyInfo.*.contactNumber": "required",
    });

    const matched = await validation.check();

    if (matched) {
      const { lineId, level, customerLevel_id, tag, companyInfo } = req.body;

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
          lineId: typeof lineId != "undefined" ? lineId : "",
          level: level,
          customerLevel: {
            customerLevel_id: CustomerLevelResult.data._id,
            level: CustomerLevelResult.data.level,
          },
          tag: typeof tag != "undefined" ? tag : "",
          companyInfo: Array.isArray(companyInfo) ? companyInfo : [companyInfo], // แปลงเป็นอาร์เรย์หากไม่ใช่
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

// 👉 Put/Update

exports.updateSaleLead = async (req, res) => {
  var result = new DataResponse();

  try {
    const validation = new Validator(req.body, {
      _id: "required",
      companyInfo_id: "required",
      level: "in:low prudential,middle prudential,high prudential",
      "companyInfo.companyEmail": "email",
    });

    const matched = await validation.check();

    if (matched) {
      const {
        _id,
        customerLevel_id,
        companyInfo_id,
        companyName,
        firstname,
        contactNumber,
        level,
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

      var customerLevelInfo = null;

      if (typeof customerLevel_id !== "undefined") {
        //check DB
        customerLevelInfo = await SaleModel.lead.getCustomerLevelById({
          _id: customerLevel_id, // ใน _id ที่ส่งมามี _id ของ ref  ไหม
        });

        //update
        const updateConditions = {
          _id: _id,
          "companyInfo._id": companyInfo_id,
        };
        var params = {};
        if (lineId) params.lineId = lineId;
        if (level) params.level = level;
        if (customerLevelInfo.data) {
          params.customerLevel = {
            customerLevel_id: customerLevelInfo.data._id,
            level: customerLevelInfo.data.level,
          };
        }
        if (tag) params.tag = tag;
        if (companyName) params["companyInfo.$.companyName"] = companyName;
        if (address) params["companyInfo.$.address"] = address;
        if (taxId) params["companyInfo.$.taxId"] = taxId;
        if (branch) params["companyInfo.$.branch"] = branch;
        if (googleMap) params["companyInfo.$.googleMap"] = googleMap;
        if (companyEmail) params["companyInfo.$.companyEmail"] = companyEmail;
        if (companyContactNumber)
          params["companyInfo.$.companyContactNumber"] = companyContactNumber;
        if (firstname) params["companyInfo.$.firstname"] = firstname;
        if (lastname) params["companyInfo.$.lastname"] = lastname;
        if (contactNumber)
          params["companyInfo.$.contactNumber"] = contactNumber;

        result = await SaleModel.lead.updateSaleLead(updateConditions, params);
      } else {
        result.doError(5, "customerLevel_id is not found!");
      }
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

// 👉 Delete

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
