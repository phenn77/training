const Member = require("../../model/entity/member");

function get(memberId) {
    return new Promise((resolve, reject) => {
        Member.findById(memberId)
            .populate({path: "artist", select: "name"})
            .populate({path: "pictures", select: "fileDirectory"})
            .exec((err, member) => {
                if (!member) {
                    // console.log("Member not found. ID: %s", memberId);

                    return reject("Member not found.");
                }

                var data = {
                    id: member.id,
                    name: member.name,
                    birthday: member.birthday,
                    status: member.status,
                    summary: member.summary,
                    position: member.position,
                    artist: {
                        id: member.artist.id,
                        name: member.artist.name
                    }
                }

                if (member.pictures.length > 0) {
                    data.pictures = {
                        fileDirectory: member.pictures[0].fileDirectory,
                    };
                }

                return resolve(data);
            });
    });
}

module.exports = {
    get,
};
