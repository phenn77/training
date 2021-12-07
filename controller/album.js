const createAlbumService = require("../service/album/createAlbum");
const getAlbumService = require("../service/album/getAlbum");
const getAllService = require("../service/album/getAll");

const message = require("../lib/message");

const createAlbum = async (req, res) => {
    let data;

    const requestBody = {
        artist: req.body.artist,
        name: req.body.name,
        releaseYear: req.body.releaseYear,
        tracklist: req.body.tracklist,
    };

    try {
        data = await createAlbumService.create(requestBody);
    } catch (e) {
        return message.error(res, e);
    }

    return message.success(res, data);
};

const getAlbum = async (req, res) => {
    let data;

    try {
        data = await getAlbumService.get(req.params.albumId);
    } catch (e) {
        return message.error(res, e);
    }

    return message.success(res, data);
};

const getAll = async (req, res) => {
    let data;

    try {
        data = await getAllService.getAll(req.query.page);
    } catch (e) {
        return message.error(res, e);
    }

    return message.success(res, data);
};

module.exports = {createAlbum, getAlbum, getAll};
