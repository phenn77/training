const { itemPerPage } = require("../config");

function getOffset(currentPage) {
  return currentPage > 0 ? (currentPage - 1) * itemPerPage : 0;
}

function getCurrentPage(pageNum, totalPage) {
  const currentPage =
    pageNum === undefined || Number(pageNum) === 0 ? 1 : Number(pageNum);

  return currentPage > totalPage ? totalPage : currentPage;
}

function getTotalPage(totalData) {
  let total = Math.ceil(totalData / itemPerPage);

  return total > 0 ? total : 1;
}

module.exports = {
  getOffset,
  getCurrentPage,
  getTotalPage,
};
