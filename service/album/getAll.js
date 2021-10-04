const Album = require("../../model/entity/album");

const { itemPerPage } = require("../../config");
const paginationUtil = require("../../lib/paginationUtil");

async function getAll(pageNum) {
  const countData = new Promise((resolve) => {
    Album.countDocuments({}, (err, result) => {
      if (err) {
        resolve(0);
      }

      resolve(result);
    });
  });
  const totalData = await Promise.resolve(countData);

  return new Promise((resolve) => {
    const totalPage = paginationUtil.getTotalPage(totalData);
    const currentPage = paginationUtil.getCurrentPage(pageNum, totalPage);
    const offset = paginationUtil.getOffset(currentPage);

    Album.find({}, {name: 1})
      .sort({ name: 1 })
      .skip(offset)
      .limit(itemPerPage)
      .populate({ path: "pictures", select: "fileDirectory" })
      .exec((err, artist) => {
        let respBody = {
          page: currentPage,
          totalPage: totalPage,
          data: [],
        };

        if (artist) {
          artist.forEach((data) => {
            const resp = data.toObject();

            delete resp._id;
            delete resp.__v;

            if (resp.pictures.length > 0) {
              resp.pictures = {
                fileDirectory: resp.pictures[0].fileDirectory,
              };
            } else {
              resp.pictures = {};
            }

            respBody.data.push(resp);
          });

          resolve(respBody);
        }

        resolve(respBody);
      });
  });
}

module.exports = { getAll };
