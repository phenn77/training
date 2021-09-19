const expect = require("chai").expect;
const sinon = require("sinon");

const createAlbumService = require("../../../service/album/createAlbum");

describe("Create Album Test : ", () => {
  it("Should Create Album", async () => {
    let requestBody = {
      artistId: "1111",
    };

    const result = await createAlbumService.create(requestBody);
  });

  it("Artist Not Found", async () => {});

  it("Album already exist", async () => {});
});
