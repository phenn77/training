const multer = require("multer");

const Picture = require("../../model/entity/picture");

const getArtistService = require("../artist/getArtist");
const getMemberService = require("../member/getMember");
const getAlbumService = require("../album/getAlbum");

function add(reqBody, reqFilePath) {
  return new Promise(async (resolve, reject) => {
    const parentId = reqBody.parentId;
    const modelName = reqBody.model;
    var currentlyUsed = reqBody.currentlyUsed === "true";

    var pictExist = false;
    if (currentlyUsed) {
      await Picture.find(
        { $and: [{ for: parentId }, { currentlyUsed: true }] },
        (err, result) => {
          pictExist = result.length > 0;
        }
      );
    }

    if (pictExist) {
      return reject(modelName + " already have active picture.");
    }

    let artistData;
    let memberData;
    let albumData;

    switch (modelName) {
      case "Artist":
        try {
          artistData = await getArtistService.get(parentId);
        } catch (err) {
          console.log(err);
          return reject(err);
        }
        break;
      case "Album":
        try {
          albumData = await getAlbumService.get(parentId);
        } catch (err) {
          console.log(err);
          return reject(err);
        }
        break;
      case "Member":
        try {
          memberData = await getMemberService.get(parentId);
        } catch (err) {
          console.log(err);
          return reject(err);
        }

        break;
      default:
        return reject("Data not found on " + modelName + ".");
    }

    const pictData = new Picture({
      for: parentId,
      onModel: modelName,
      currentlyUsed: currentlyUsed,
      fileDirectory: reqFilePath,
    });

    pictData.save((error, result) => {
      if (error) {
        reject(error.message);
      }

      if (result) {
        resolve(result);
      }

      resolve(null);
    });
  });
}

module.exports = { add };
