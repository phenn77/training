const User = require("../../model/entity/user/user");
const status = require("../../model/enum/status");

function create(data) {
    return new Promise(function (resolve, reject) {
        const username = data.username;

        User.findOne(
            // { $or: [{ email: data.email }, { username: data.username }] },
            {
                $or: [
                    {email: data.email},
                    {username: {$regex: new RegExp(`^${username}$`, "i")}},
                ],
            },
            (err, result) => {
                if (result) {
                    console.log(
                        "User already exist. Username: %s, Email: %s",
                        data.username,
                        data.email
                    );

                    reject("User already exist. User ID: " + result._id);
                }

                const user = new User({
                    name: data.name,
                    username: data.username,
                    password: data.password,
                    birthday: data.birthday,
                    status: status.REQUESTED,
                });

                if (data.email != null) {
                    user.email = data.email.toLowerCase();
                }

                user.save((error, resp) => {
                    if (err) {
                        reject(error.message);
                    }

                    if (resp) {
                        resolve(resp);
                    }

                    resolve(null);
                });
            }
        );
    });
}

module.exports = {create};
