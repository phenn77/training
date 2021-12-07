const expect = require("chai").expect;
const sinon = require("sinon");
const faker = require("faker");

const Artist = require("../../../model/entity/artist");
const Album = require("../../../model/entity/album");

const createAlbumSrv = require("../../../service/album/createAlbum");

describe("Create Album Test", () => {
    let artistStub, albumStub, noop, payload, artist, album, mockSave;

    before(() => {
        noop = () => {
        };
    });

    beforeEach(() => {
        payload = {
            name: faker.name.findName(),
            artist: faker.datatype.uuid
        };

        artist = {
            id: faker.datatype.uuid,
            name: faker.name.findName(),
        };

        album = {
            id: faker.datatype.uuid,
            name: faker.name.findName(),
            releaseYear: "2020",
            tracklist: ["Track 1"]
        };
    });

    afterEach(() => {
        artistStub.restore();
        albumStub.restore();
        mockSave.restore();
    });

    it("Success", () => {
        artistStub = sinon.stub(Artist, "findById").returns({
            exec: sinon.stub().yields(null, artist),
        });

        albumStub = sinon.stub(Album, "findOne").returns({
            populate: sinon.stub().returns({
                exec: sinon.stub().yields(null),
            }),
        });

        mockSave = sinon.stub(Album.prototype, "save").yields(null, album);

        return createAlbumSrv.create(payload).then((data) => {
            expect(data.name).to.be.equal(album.name);
            expect(data.releaseYear).to.be.equal(album.releaseYear);
        });
    });

    it("Album's artist not found", () => {
        artistStub = sinon.stub(Artist, "findById").returns({
            exec: sinon.stub().yields("Error"),
        });

        return createAlbumSrv.create(payload).then(noop, (data) => {
            expect(data).to.be.equal("Artist not found.");
        });
    });

    it("Album already exist", () => {
        artistStub = sinon.stub(Artist, "findById").returns({
            exec: sinon.stub().yields(null, artist),
        });

        albumStub = sinon.stub(Album, "findOne").returns({
            populate: sinon.stub().returns({
                exec: sinon.stub().yields(null, album),
            }),
        });

        return createAlbumSrv.create(payload).then(noop, (data) => {
            expect(data).to.be.equal("Album already exist.");
        });
    });

    it("Album created failed : Empty tracklist", () => {
        artistStub = sinon.stub(Artist, "findById").returns({
            exec: sinon.stub().yields(null, artist),
        });

        albumStub = sinon.stub(Album, "findOne").returns({
            populate: sinon.stub().returns({
                exec: sinon.stub().yields(null),
            }),
        });

        mockSave = sinon.stub(Album.prototype, "save").yields(new Error("Error"));

        return createAlbumSrv.create(payload).then(noop, (data) => {
            expect(data).to.be.equal("Album already exist.");
        });
    })
});
