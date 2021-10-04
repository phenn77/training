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
        { $and: [{ for: parentId }, { currentlyUsed: true }] },
        (err, result) => {
          if (err) {
            resolve(0);
          }

          if (result) {
            resolve(result);
          }

          resolve(0);
          pictExist = result.length > 0;
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

function getArtist(parentId) {
  return new Promise((resolve) => {
    Artist.findOne({ _id: parentId }, (err, result) => {
      if (err) {
        resolve(false);
      }

      if (result) {
        resolve(true);
      }

      resolve(false);
    });
  });
}

function getAlbum(parentId) {
  return new Promise((resolve) => {
    Album.findOne({ _id: parentId }, (err, result) => {
      if (err) {
        resolve(false);
      }

      if (result) {
        resolve(true);
      }

      resolve(false);
    });
  });
}

function getMember(parentId) {
  return new Promise((resolve) => {
    Member.findOne({ _id: parentId }, (err, result) => {
      if (err) {
        resolve(false);
      }

      if (result) {
        resolve(true);
      }

      resolve(false);
    });
  });
}

function getSingle(parentId) {
  return new Promise((resolve) => {
    Single.findOne({ _id: parentId }, (err, result) => {
      if (err) {
        resolve(false);
      }

      if (result) {
        resolve(true);
      }

      resolve(false);
    });
  });
}

module.exports = { add };
