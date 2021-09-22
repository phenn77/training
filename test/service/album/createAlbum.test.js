const expect = require("chai").expect;
const { stub } = require("sinon");

const createAlbumService = require("../../../service/album/createAlbum");
const getArtistService = require("../../../service/artist/getArtist");

const reqBody = {
  artistId: "1111",
};

const artistData = {
  _id: "1111",
};

describe("Create Album Test : ", () => {
  before(() => {});

  it("Create Success", async () => {});

  it("Artist Not Found", async () => {});

  it("Album already exist", async () => {});
});
