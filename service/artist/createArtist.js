const Artist = require("../../model/entity/artist");

function create(data) {
    return new Promise((resolve, reject) => {
        Artist.findOne(
            {name: {$regex: new RegExp(`^${data.name}$`, "i")}},
            (err, result) => {
                if (result) {
                    // console.log("Artist already exist. Name: %s", data.name);

                    return reject("Artist already exist.");
                }

                const artist = new Artist({
                    name: data.name,
                    origin: data.origin,
                    status: data.status,
                    summary: data.summary,
                    website: data.website,
                    rating: data.rating === undefined ? 0.0 : data.rating
                });

                artist.save((error, resp) => {
                    return resolve({
                        id: resp.id,
                        name: resp.name,
                        alias: resp.alias,
                        origin: resp.origin,
                        status: resp.status,
                        summary: resp.summary,
                        website: resp.website,
                        rating: resp.rating
                    });
                });
            }
        );
    });
}

module.exports = {create};
