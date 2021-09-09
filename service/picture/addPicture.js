const Artist = require("../../model/entity/artist");
const Picture = require("../../model/entity/picture");

const getArtistService = require("../artist/getArtist");
// const getMemberService = require("../member/getMember");
const getAlbumService = require("../album/getAlbum");

function add(requestBody) {
  return new Promise(async (resolve, reject) => {
    if (requestBody.pictures.length === 0) {
      console.log("No pictures.");
      return resolve(null);
    }

    //contain id of either Artist / Member / Album
    let parentId = requestBody.parentId;

    let artistData;
    let memberData;
    let albumData;

    let model;

    try {
      artistData = await getArtistService.get(parentId);
      model = "Artist";
    } catch (err) {
      console.log(err);
    }

    if (!artistData) {
      try {
        memberData = await getMemberService(parentId);
        model = "Member";
      } catch (err) {
        console.log(err);
      }
    }

    // if (!memberData) {
    //   try {
    //     albumData = await getAlbumService(parentId);
    //   } catch (err) {
    //     console.log("Album not found.");
    //   }
    // }

    // if (!albumData) {
    //   console.log("Data not found. ID: %s", parentId);

    //   return reject("Data not found. ID: " + parentId);
    // }

    requestBody.pictures.forEach((item) => {
      const pictData = new Picture({
        url: item.url,
        by: parentId,
        onModel: model,
        currentlyUsed: false,
      });

      console.log(pictData);

      pictData.save((err, result) => {
        if (err) {
          reject(err.message);
        }

        if (result) {
          var response = result.toObject();

          delete response._id;
          delete response.__v;

          resolve(response);
        }

        resolve(null);
      });
    });
  });
}

module.exports = { add };
