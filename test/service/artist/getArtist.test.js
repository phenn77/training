const expect = require("chai").expect;
const sinon = require("sinon");
const faker = require("faker");

const Artist = require("../../../model/entity/artist");
const getArtistSrv = require("../../../service/artist/getArtist");

describe("Get Artist Test", () => {
  var noop, dbStub, artistId;

  before(() => {
    noop = () => {};
  });

  beforeEach(() => {
    artistId = faker.datatype.uuid;
  });

  afterEach(() => {
    dbStub.restore();
  });

  it("Return the artist data ", () => {
    const artist = {
      members: [
        {
          pictures: [{}],
        },
      ],
      albums: [
        {
          pictures: [{}],
        },
      ],
      singles: [
        {
          pictures: [{}],
        },
      ],
      pictures: [{}],
    };

    dbStub = sinon.stub(Artist, "findOne").returns({
      populate: sinon.stub().returns({
        populate: sinon.stub().returns({
          populate: sinon.stub().returns({
            populate: sinon.stub().returns({
              exec: sinon.stub().yields(null, artist),
            }),
          }),
        }),
      }),
    });

    return getArtistSrv.get(artistId).then((data) => {
      expect(data).to.be.an("object");
      expect(data.members.length).to.be.equal(1);
      expect(data.albums.length).to.be.equal(1);
      expect(data.singles.length).to.be.equal(1);
      expect(data.pictures).to.be.an("object");
    });
  });

  it("Return the artist data only", () => {
    const artist = {
      members: [],
      albums: [],
      singles: [],
      pictures: [{}],
    };

    dbStub = sinon.stub(Artist, "findOne").returns({
      populate: sinon.stub().returns({
        populate: sinon.stub().returns({
          populate: sinon.stub().returns({
            populate: sinon.stub().returns({
              exec: sinon.stub().yields(null, artist),
            }),
          }),
        }),
      }),
    });

    return getArtistSrv.get(artistId).then((data) => {
      expect(data).to.be.an("object");
      expect(data.members.length).to.be.equal(0);
      expect(data.albums.length).to.be.equal(0);
      expect(data.singles.length).to.be.equal(0);
      expect(data.pictures).to.be.an("object");
    });
  });

  it("Return the artist data without any pictures", () => {
    const artist = {
      members: [{
          pictures: []
      }],
      albums: [{
        pictures: []
    }],
      singles: [{
        pictures: []
    }],
      pictures: [],
    };

    dbStub = sinon.stub(Artist, "findOne").returns({
      populate: sinon.stub().returns({
        populate: sinon.stub().returns({
          populate: sinon.stub().returns({
            populate: sinon.stub().returns({
              exec: sinon.stub().yields(null, artist),
            }),
          }),
        }),
      }),
    });

    return getArtistSrv.get(artistId).then((data) => {
      expect(data).to.be.an("object");
      expect(data.members.length).to.be.equal(1);
      expect(data.albums.length).to.be.equal(1);
      expect(data.singles.length).to.be.equal(1);
      expect(data.pictures).to.be.an("object");
    });
  });

  it("Artist not found", () => {
    dbStub = sinon.stub(Artist, "findOne").returns({
      populate: sinon.stub().returns({
        populate: sinon.stub().returns({
          populate: sinon.stub().returns({
            populate: sinon.stub().returns({
              exec: sinon.stub().yields(null, null),
            }),
          }),
        }),
      }),
    });

    return getArtistSrv.get(artistId).then(noop, (data) => {
      expect(data).to.be.equal("Artist not found.");
    });
  });
});
