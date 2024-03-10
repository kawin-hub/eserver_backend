const InventoryTotal = require("./inventoryTotals.schema");
const { DataResponse } = require("../../general_data.model");

// 👉 Get all

exports.getAllInventoryTotals = async (params) => {
    var result = new DataResponse();
    try {
        var limit = parseInt(params.limit);
        var page = parseInt(params.page) ? parseInt(params.page) : 1;
        var skip = (page - 1) * limit;
        skip = skip < 1 ? 0 : skip;

        var queryCondition =
            params.queryCondition !== undefined ? params.queryCondition : {};

        const queryResult = await InventoryTotal.find(queryCondition, {
            productModel: 1,
            inventoryLocation: 1,
        })
            .skip(skip)
            .limit(limit);

        result.doSuccess(1);

        var countTotalRow = await InventoryTotal.countDocuments(
            params.queryCondition
        );
        result.doSuccess(1);

        result.data = {
            documents: queryResult,
        };
        result.data.limit = limit;
        result.data.page = skip / limit + 1;
        result.data.totalPage = Math.ceil(countTotalRow / limit);
        result.data.totalCount = countTotalRow;

        //totalCount
    } catch (e) {
        result.doError();
    }

    return result;
};

// 👉 Get by ID

exports.getInventoryTotalById = async (params) => {
    var result = new DataResponse();

    try {
        result.data = await InventoryTotal.findOne(params).lean();
        result.data == null
            ? result.doSuccess(2, "_id not found in database")
            : result.doSuccess(1);
    } catch (e) {
        console.log(e.kind);
        if (e.kind == "ObjectId") {
            result.doError(0, "Please check your _id format");
        } else {
            result.doError(0);
        }
    }

    return result;
};