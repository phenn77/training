const multer = require("multer");

const addPictureService = require("../service/picture/addPicture");
const getPictureService = require("../service/picture/getPicture");

const message = require("../lib/message");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const uploadImg = multer({storage: storage}).single("image");

const addPicture = async (req, res) => {
    if (!req.file) {
        return message.error(res, "File not found.");
    }

    let data;

    try {
        data = await addPictureService.add(req.body, req.file.path);
    } catch (err) {
        return message.error(res, err);
    }

    return message.success(res, data);
};

const getPicture = async (req, res) => {
    let data;

    try {
        data = await getPictureService.get(req.params.parentId);
    } catch (err) {
        return message.error(res, err);
    }

    return message.success(res, data);
};

module.exports = {uploadImg, addPicture, getPicture};
