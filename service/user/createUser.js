const User = require("../../model/entity/user/user");
const status = require("../../model/enum/status");

function create(data) {
  return new Promise(function (resolve, reject) {
    const username = data.username;

    User.findOne(
      // { $or: [{ email: data.email }, { username: data.username }] },
      {
        $or: [
          { email: data.email },
          { username: { $regex: new RegExp(`^${username}$`), $options: "i" } },
        ],
      },
      (err, result) => {
        console.log(result);

        if (result) {
          console.log(
            "User already exist. Username: %s, Email: %s",
            data.username,
            data.email
          );

          return reject("User already exist.");
        }

        const user = new User({
          name: data.name,
          username: data.username,
          email: data.email.toLowerCase(),
          password: data.password,
          birthday: data.birthday,
          status: status.REQUESTED,
        });

        user.save((err, result) => {
          if (result) {
            return resolve(user);
          }
        });
      }
    );
  });
}

module.exports = { create };
