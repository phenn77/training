const Album = require("../../model/entity/album");

const {itemPerPage} = require("../../configuration/config");
const paginationUtil = require("../../lib/paginationUtil");

async function getAll(pageNum) {
    const countData = new Promise((resolve) => {
        Album.countDocuments({}, (err, result) => {
            if (err) {
                return resolve(0);
            }

            return resolve(result);
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

        Album.find({}, {name: 1, releaseYear: 1})
            .sort({name: 1})
            .skip(offset)
            .limit(itemPerPage)
            .populate({path: "pictures", select: "fileDirectory"})
            .exec((err, album) => {
                album.forEach((data) => {
                    let alb = {
                        id: data.id,
                        name: data.name,
                        releaseYear: data.releaseYear,
                    }

                    if (data.pictures.length > 0) {
                        alb.pictures = {
                            fileDirectory: data.pictures[0].fileDirectory,
                        };
                    } else {
                        alb.pictures = {};
                    }

                    respBody.data.push(alb);
                });

                return resolve(respBody);
            });
    });
}

module.exports = {getAll};
