const expect = require("chai").expect;
const sinon = require("sinon");
const faker = require("faker");

const Artist = require("../../../model/entity/artist");
const getAllSrv = require("../../../service/artist/getAll");

describe("Get All Artist Test", () => {
  let noop, dbStub;

  before(() => {
    noop = () => {};
  });

  afterEach(() => {
    dbStub.restore();
  });

  it("Return empty data", () => {
    dbStub = sinon.stub(Artist, "countDocuments").yields(null, 0);

    return getAllSrv.getAll().then((data) => {
      expect(data.page).to.be.equal(1);
      expect(data.totalPage).to.be.equal(1);
    });
  });

  it("Count error, return empty data", () => {
    dbStub = sinon.stub(Artist, "countDocuments").yields("Error");

    return getAllSrv.getAll().then((data) => {
      expect(data.page).to.be.equal(1);
      expect(data.totalPage).to.be.equal(1);
    });
  });

  const records = [
    {
      name: faker.name.findName(),
      pictures: [],
    },
    {
      name: faker.name.findName(),
      pictures: [],
    },
    {
      name: faker.name.findName(),
      pictures: [],
    },
    {
      name: faker.name.findName(),
      pictures: [],
    },
    {
      name: faker.name.findName(),
      pictures: [{ fileDirectory: faker.image }],
    },
  ];

  it("Return 5 data", () => {
    dbStub = sinon.stub(Artist, "countDocuments").yields(null, 5);
    dbStub = sinon.stub(Artist, "find").returns({
      sort: sinon.stub().returns({
        skip: sinon.stub().returns({
          limit: sinon.stub().returns({
            populate: sinon.stub().returns({
              exec: sinon.stub().yields(null, records),
            }),
          }),
        }),
      }),
    });

    return getAllSrv.getAll().then((result) => {
      expect(result.page).to.be.equal(1);
      expect(result.totalPage).to.be.equal(5);
      expect(result.data.length).to.be.equal(5);
    });
  });
});
