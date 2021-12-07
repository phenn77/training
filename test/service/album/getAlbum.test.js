const expect = require("chai").expect;
const sinon = require("sinon");
const faker = require("faker");

const Album = require("../../../model/entity/album");
const getAlbumSrv = require("../../../service/album/getAlbum");

describe("Get Album By ID Test", function () {
    let noop, albumId, dbStub;

    before(() => {
        noop = () => {
        };
    });

    beforeEach(() => {
        albumId = faker.datatype.uuid;
    });

    afterEach(() => {
        dbStub.restore();
    });

    it("Return with empty picture", () => {
        dbStub = sinon.stub(Album, "findById").returns({
            populate: sinon.stub().returns({
                populate: sinon.stub().returns({
                    exec: sinon.stub().yields(null, {
                        name: faker.name.findName(),
                        artist: {
                            id: faker.datatype.uuid,
                            name: faker.name.findName(),
                        },
                        pictures: []
                    }),
                }),
            }),
        });

        return getAlbumSrv.get(albumId).then((data) => {
            expect(data).to.be.an('object');
        });
    });

    it("Return with a picture", () => {
        dbStub = sinon.stub(Album, "findById").returns({
            populate: sinon.stub().returns({
                populate: sinon.stub().returns({
                    exec: sinon.stub().yields(null, {
                        name: faker.name.findName(),
                        artist: {
                            id: faker.datatype.uuid,
                            name: faker.name.findName(),
                        },
                        pictures: [
                            {
                                fileDirectory: faker.name.findName(),
                            }
                        ]
                    }),
                }),
            }),
        });

        return getAlbumSrv.get(albumId).then((data) => {
            expect(data).to.be.an('object');
        });
    });

    it("Album not found", () => {
        dbStub = sinon.stub(Album, "findById").returns({
            populate: sinon.stub().returns({
                populate: sinon.stub().returns({
                    exec: sinon.stub().yields(null),
                }),
            }),
        });

        return getAlbumSrv.get().then(noop, (data) => {
            expect(data).to.deep.equal("Album not found.");
        });
    });
});
