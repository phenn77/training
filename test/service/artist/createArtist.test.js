const expect = require("chai").expect;
const sinon = require("sinon");
const faker = require("faker");

const Artist = require("../../../model/entity/artist");

const createArtistSrv = require("../../../service/artist/createArtist");

describe("Create Artist Test", () => {
    let noop, dbStub, artist, mockSave;

    before(() => {
        noop = () => {
        };

        artist = {
            id: faker.datatype.uuid,
            name: faker.name.findName(),
        };
    });

    afterEach(() => {
        mockSave.restore();
        dbStub.restore();
    });

    it("Success", () => {
        artist.rating = 4;

        dbStub = sinon.stub(Artist, "findOne").yields(null);

        mockSave = sinon.stub(Artist.prototype, "save").yields(null, artist);

        return createArtistSrv.create(artist).then((data) => {
            expect(data.name).to.be.equal(artist.name);
        });
    });

    it("Success without Rating", () => {
        artist.rating = undefined;

        dbStub = sinon.stub(Artist, "findOne").yields(null);

        mockSave = sinon.stub(Artist.prototype, "save").yields(null, artist);

        return createArtistSrv.create(artist).then((data) => {
            expect(data.name).to.be.equal(artist.name);
        });
    });

    it("Artist already exist", () => {
        dbStub = sinon.stub(Artist, "findOne").yields(null, artist);

        return createArtistSrv.create(artist).then(noop, (data) => {
            expect(data).to.deep.equal("Artist already exist.");
        });
    });
});
