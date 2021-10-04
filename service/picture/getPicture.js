const Picture = require("../../model/entity/picture");

function get(parentId) {
  return new Promise((resolve) => {
    Picture.find({ for: parentId })
      .sort({ currentlyUsed: -1 }) //sort by true, comes first
      .limit(30)
      .populate({ path: "artist" })
      .exec((err, picture) => {
        if (err) {
          resolve([]);
        }

        let pictData = [];
        if (picture.length > 0) {
          picture.forEach((pict) => {
            const dt = {
              fileDirectory: pict.fileDirectory,
              name: pict.artist[0].name,
              id: pict.id,
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
