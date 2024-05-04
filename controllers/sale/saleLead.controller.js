//Sale model
let SaleModel = require("../../models/Sale");
let { general } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");
const { LineClient } = require("../../services/third_party/line");

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
    const { _id, txtSearch, level } = req.query;

    var SaleLeadModel = SaleModel.lead;

    if (typeof _id != "undefined") {
      result = await SaleLeadModel.getSaleLeadById({
        _id: new Object(_id),
      });
    } else {
      // get all
      var pageOption = general.checkPageAndLimit(
        req.query.page,
        req.query.limit
      );

      var params = {
        page: pageOption.page,
        limit: pageOption.limit,
        queryCondition: {},
        projector: {
          _id: 1,
          createdAt: 1,
          lineId: 1,
          level: 1,
          customerLevel_id: 1,
          tag: 1,
          companyInfo: 1,
          createdBy: 1,
          customerLevel: 1,
        },
      };

      var orConditions;

      if (typeof txtSearch !== "undefined") {
        const searchRegex = new RegExp(txtSearch, "i");
        orConditions = [
          {
            "companyInfo.companyName": searchRegex,
          },
          {
            "companyInfo.firstname": searchRegex,
          },
          {
            "companyInfo.contactNumber": searchRegex,
          },
        ];

        params.queryCondition["$or"] = orConditions;
      }

      if (typeof level !== "undefined") {
        params.queryCondition["level"] = level;
      }

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
      level: "in:low prudential,middle prudential,high prudential",
      customerLevel_id: "required",
      /* tag: "required|array", */
      lineId: "required",
      /* "companyInfo.*.address": "required|string",
      "companyInfo.*.branch": "required|string",
      "companyInfo.*.companyContactNumber": "required|string",
      "companyInfo.*.companyEmail": "required|email",
      "companyInfo.*.companyName": "required|string",
      "companyInfo.*.googleMap": "required|string",
      "companyInfo.*.taxId": "required|string", */
      "companyInfo.*.contactNumber": "required|string",
      "companyInfo.*.firstname": "required|string",
      /* "companyInfo.*.lastname": "required|string", */
    });

    const matched = await validation.check();
    if (matched) {
      const { _id, lineId, level, customerLevel_id, tag, companyInfo } =
        req.body;

      const customerLevelResult = await SaleModel.lead.getCustomerLevelById({
        _id: customerLevel_id,
      });

      if (customerLevelResult.code == 1) {
        params = {
          lineId: lineId,
          level: level,
          tag: tag,
          customerLevel: {
            customerLevel_id: customerLevelResult.data._id,
            level: customerLevelResult.data.level,
          },
          companyInfo: companyInfo,
        };

        result = await SaleModel.lead.updateSaleLead({ _id: _id }, params);
      }
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

/* exports.updateSaleLeadTemp = async (req, res) => {
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
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
}; */

// 👉 Delete

exports.deleteSaleLead = async (req, res) => {
  const { _id } = req.body;
  try {
    var result = new DataResponse();
    if (typeof _id != "undefined") {
      const quotationResult = await SaleModel.quotation.getSaleQuotationById({
        _id,
      });

      result = await SaleModel.lead.deleteSaleLead({ _id: _id });
    } else {
      result.doError(2, "_id is required.");
    }
  } catch (e) {
    console.log(e);
  }

  res.json(result);
};

// 👉 Get Line Users

exports.getLineUsers = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id } = req.query;

    var SaleLeadModel = SaleModel.lead;
    var params = {};

    if (typeof _id != "undefined") {
      params = { _id: _id };
    }

    result = await SaleLeadModel.getLineUsersByConditions(params);
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

exports.getLineUserFromLineDeveloper = async (req, res) => {
  var result = new DataResponse();

  try {
    const { line_id } = req.query;

    if (typeof line_id != "undefined") {
      const profile = await LineClient.getProfile(line_id);

      if (profile) {
        result.doSuccess();
        result.data = {
          id: line_id,
          name: profile.displayName,
          pictureUrl: profile.pictureUrl,
        };
      } else {
        result.doError(5, "This line_id is not found.");
      }
    } else {
      result.doError(2, "line_id is required.");
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

exports.lineWebHook = async (req, res) => {
  try {
    Promise.all(req.body.events.map(handleLineEvent))
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      });
  } catch (error) {}
};

async function handleLineEvent(event) {
  var result = new DataResponse();
  try {
    if (event.type === "message") {
      const userId = event.source.userId;
      const profile = await LineClient.getProfile(userId);

      var SaleLeadModel = SaleModel.lead;
      result = await SaleLeadModel.insertLineLead({
        lineId: userId,
        name: profile.displayName,
        pictureUrl: profile.pictureUrl,
      });

      return { message: "success" };
    }
  } catch (error) {}
}
