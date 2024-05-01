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

exports.formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
