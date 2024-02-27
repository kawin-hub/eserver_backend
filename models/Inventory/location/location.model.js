const InventoryLocation = require("./inventoryLocations.schema");
const { DataResponse } = require("../../general_data.model");

// 👉 Get all

exports.getAllInventoryLocations = async (params) => {
    var result = new DataResponse();
    try {
        var limit = parseInt(params.limit);
        var page = parseInt(params.page) ? parseInt(params.page) : 1;
        var skip = (page - 1) * limit;
        skip = skip < 1 ? 0 : skip;

        var queryCondition =
            params.queryCondition !== undefined ? params.queryCondition : {};

        const queryResult = await InventoryLocation.find(queryCondition, {
            _id: 1,
            name: 1,
            adminName: 1,
            contactNumber: 1,
            address: 1,
            status: 1,
        })
            .skip(skip)
            .limit(limit);

        result.doSuccess(1);

        var countTotalRow = await InventoryLocation.countDocuments(
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

exports.getInventoryLocationById = async (params) => {
    var result = new DataResponse();

    try {
        result.data = await InventoryLocation.findOne(params).lean();
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

// 👉 Insert/Post

exports.insertInventoryLocation = async (params) => {
    var result = new DataResponse();

    try {
        result.data = await InventoryLocation.create(params);
        result.data == null
            ? result.doSuccess(
                0,
                "Can't insert to database, please check your request!"
            )
            : result.doSuccess(1);
    } catch (e) {
        console.log(e);
        e.code == 11000
            ? result.doError(6, "Lot index duplicate!")
            : result.doError();
    }

    return result;
};

// 👉 Update/Put

exports.updateInventoryLocation = async (_id, update) => {
    var location = null;

    try {
        location = await InventoryLocation.findByIdAndUpdate(_id, update);
    } catch (e) {
        location = e;
    }

    return location;
};

// 👉 Delete

exports.deleteInventoryLocation = async (data) => {
    var result = null;
    try {
        result = await InventoryLocation.findByIdAndRemove(data);
    } catch (e) {
        result = e;
    }

    return result;
};

// 👉 Get by array ID

exports.getInventoryLocationbyArrayId = async (location_ids) => {
    var result = new DataResponse();
    try {
        result.data = await InventoryLocation.find(
            { _id: { $in: location_ids } },
            { _id: 1, modelCode: 1, name: 1 }
        ).lean();
        result.data == null
            ? result.doSuccess(2, "_id not found in database")
            : result.doSuccess(1);
    } catch (e) {
        console.log(e);
        if (e.kind == "ObjectId") {
            result.doError(0, "Please check your _id format");
        } else {
            result.doError(0);
        }
    }

    return result;
};