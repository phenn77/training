const Member = require("../../model/entity/member");

function get(memberId) {
  return new Promise((resolve, reject) => {
    Member.find()
      .populate({ path: "artist", select: "name" })
      .exec((err, member) => {
        if (err) {
          console.log("Member not found. ID: %s", memberId);

          return reject("Member not found.");
        }

        if (member) {
          const response = member.toObject();

          delete response._id;
          delete response.__v;

          resolve(response);
        }

        resolve(null);
      });
  });
}

module.exports = {
  get,
};
