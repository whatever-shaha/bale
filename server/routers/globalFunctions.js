const { reduce } = require("lodash");

module.exports.reducer = (arr, el) =>
  reduce(arr, (prev, item) => prev + (item[el] || 0), 0);
module.exports.reducerDuobleProperty = (arr, el1, el2) =>
  reduce(arr, (prev, item) => prev + (item[el1][el2] || 0), 0);

module.exports.roundToUzs = (number) => Math.round(number * 1) / 1;
module.exports.roundToUsd = (number) => Math.round(number * 1000) / 1000;
