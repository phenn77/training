const Artist = require("../../model/entity/artist");

const { itemPerPage } = require("../../config");
const paginationUtil = require("../../lib/paginationUtil");

async function getAll(pageNum) {
  const countData = new Promise((resolve) => {
    Artist.countDocuments({}, (err, data) => {
      if (err) {
        return resolve(0);
      }

      return resolve(data);
    });
  });

  const totalData = await Promise.resolve(countData);

  return new Promise((resolve) => {
    const totalPage = paginationUtil.getTotalPage(totalData);
    const currentPage = paginationUtil.getCurrentPage(pageNum, totalPage);
    const offset = paginationUtil.getOffset(currentPage);

    let respBody = {
      page: currentPage,
      totalPage: totalPage,
      data: [],
    };

    if (totalData === 0) {
      return resolve(respBody);
    }

    Artist.find({}, { name: 1 })
      .sort({ name: 1 })
      .skip(offset)
      .limit(itemPerPage)
      .populate({ path: "pictures", select: "fileDirectory" })
      .exec((err, artist) => {
        artist.forEach((data) => {
          let resp = {
            id: data.id,
            name: data.name,
          };

          if (data.pictures.length > 0) {
            resp.pictures = {
              fileDirectory: data.pictures[0].fileDirectory,
            };
          } else {
            resp.pictures = {};
          }

          respBody.data.push(resp);
        });

        return resolve(respBody);
      });
  });
}

module.exports = { getAll };
