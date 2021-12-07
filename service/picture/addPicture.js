const Picture = require("../../model/entity/picture");

const Artist = require("../../model/entity/artist");
const Album = require("../../model/entity/album");
const Member = require("../../model/entity/member");
const Single = require("../../model/entity/single");

async function add(reqBody, reqFilePath) {
    const parentId = reqBody.parentId;
    const modelName = reqBody.model;
    var currentlyUsed = reqBody.currentlyUsed === "true";

    let pictExist = false;
    if (currentlyUsed) {
        const pictData = new Promise((resolve) => {
            Picture.countDocuments(
                {$and: [{for: parentId}, {currentlyUsed: true}]},
                (err, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        resolve(0);
                    }
                }
            );
        });

        const pict = await Promise.resolve(pictData);

        pictExist = pict > 0;
    }

    let dataFound = false;
    switch (modelName) {
        case "Artist":
            var artistData = getArtist(parentId);
            dataFound = await Promise.resolve(artistData);

            break;
        case "Album":
            var albumData = getAlbum(parentId);
            dataFound = await Promise.resolve(albumData);

            break;
        case "Member":
            var memberData = getMember(parentId);
            dataFound = await Promise.resolve(memberData);

            break;
        case "Single":
            var singleData = getSingle(parentId);
            dataFound = await Promise.resolve(singleData);

            break;
        default:
    }

    return new Promise((resolve, reject) => {
        if (pictExist) {
            return reject(modelName + " already have active picture.");
        }

        if (!dataFound) {
            return reject("Data not found on " + modelName + ".");
        }

        const pictData = new Picture({
            for: parentId,
            onModel: modelName,
            currentlyUsed: currentlyUsed,
            fileDirectory: reqFilePath,
        });

        pictData.save((error, result) => {
            if (result) {
                return resolve(pictData);
            } else {
                return reject("Error");
            }
        });
    });
}

function getArtist(parentId) {
    return new Promise((resolve) => {
        Artist.findById(parentId, (err, result) => {
            let resp = false;
            if (result) {
                resp = true;
            }

            return resolve(resp);
        });
    });
}

function getAlbum(parentId) {
    return new Promise((resolve) => {
        Album.findById(parentId, (err, result) => {
            let resp = false;
            if (result) {
                resp = true;
            }

            return resolve(resp);
        });
    });
}

function getMember(parentId) {
    return new Promise((resolve) => {
        Member.findById(parentId, (err, result) => {
            let resp = false;
            if (result) {
                resp = true;
            }

            return resolve(resp);
        });
    });
}

function getSingle(parentId) {
    return new Promise((resolve) => {
        Single.findById(parentId, (err, result) => {
            let resp = false;
            if (result) {
                resp = true;
            }

            return resolve(resp);
        });
    });
}

module.exports = {add};
