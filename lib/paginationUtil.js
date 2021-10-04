const { itemPerPage } = require("../config");

function getOffset(currentPage) {
  return currentPage > 0 ? (currentPage - 1) * itemPerPage : 0;
}

function getCurrentPage(pageNum, totalPage) {
  const currentPage = pageNum === undefined ? 1 : Number(pageNum);

  return currentPage > totalPage ? totalPage : currentPage;
}

function getTotalPage(totalData) {
  return Math.ceil(totalData / itemPerPage);
}

module.exports = {
  getOffset,
  getCurrentPage,
  getTotalPage,
};
