const User = require("../../model/entity/user/user");
const status = require("../../model/enum/status");

function approve(userId) {
  return new Promise(function (resolve, reject) {
    const data = User.findById({ _id: userId });

    if (status.REQUESTED !== data.status) {
      reject("Cannot process User");
    }

    data.status = status.APPROVED;

    const response = null;
    try {
      response = User.update(data);
    } catch (e) {
      reject("Failed to approve User");
    }

    resolve(response);
  }).catch((error) => {
    console.log(error);
  });
}

module.exports = approve();
