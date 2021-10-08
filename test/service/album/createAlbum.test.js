const expect = require("chai").expect;
const sinon = require("sinon");

const sandbox = sinon.createSandbox();

const createAlbumSrv = require("../../../service/album/createAlbum");


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
