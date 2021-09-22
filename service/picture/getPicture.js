const fetch = require("node-fetch");
const { replaceOne } = require("../../model/entity/picture");

const Picture = require("../../model/entity/picture");

function get(parentId) {
  return new Promise((resolve, reject) => {
    Picture.find({ for: parentId })
      .sort({ currentlyUsed: -1 }) //sort by true, comes first
      .exec((err, picture) => {
        if (err) {
          resolve([]);
        }

        let pictData = [];
        if (picture.length > 0) {
          picture.forEach((pict) => {
            const dt = {
              fileDirectory: pict.fileDirectory,
              currentlyUsed: pict.currentlyUsed,
            };

            pictData.push(dt);
          });

          resolve(pictData);
        }

        resolve([]);
      });
  });
}

module.exports = { get };
