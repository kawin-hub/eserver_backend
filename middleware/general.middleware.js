let dotenv = require("dotenv");
dotenv.config();

exports.checkPageAndLimit = (page = 1, limit = process.env.QUERYROWPERTIME) => {
  if (parseInt(limit) > parseInt(process.env.QUERYROWPERTIMELimit)) {
    limit = process.env.QUERYROWPERTIMELimit;
  }

  return {
    page: page === undefined ? 1 : parseInt(page) === NaN ? 1 : page,
    limit:
      limit === undefined
        ? process.env.QUERYROWPERTIME
        : parseInt(limit) === NaN
        ? process.env.QUERYROWPERTIME
        : limit,
  };
};
