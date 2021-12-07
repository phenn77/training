const expect = require("chai").expect;
const sinon = require("sinon");
const faker = require("faker");

const Album = require("../../../model/entity/album");
const getAllSrv = require("../../../service/album/getAll");

describe("Get All Album Test", () => {
    let dbStub;

    afterEach(() => {
        dbStub.restore();
    });

    it("Return empty data", () => {
        dbStub = sinon.stub(Album, "countDocuments").yields(null, 0);

        return getAllSrv.getAll().then((data) => {
            expect(data.page).to.be.equal(1);
        });
    });

    it("Count data error, return empty data", () => {
        dbStub = sinon.stub(Album, "countDocuments").yields("Error");

        return getAllSrv.getAll().then((data) => {
            expect(data.page).to.be.equal(1);
        });
    });

    it("Returns 2 data", () => {
        dbStub = sinon.stub(Album, "countDocuments").yields(null, 2);

        const data = [
            {
                id: faker.datatype.uuid,
                name: faker.name.findName(),
                releaseYear: faker.date,
                pictures: [],
            },
            {
                id: faker.datatype.uuid,
                name: faker.name.findName(),
                releaseYear: faker.date,
                pictures: [
                    {
                        fileDirectory: faker.image,
                    },
                ],
            },
        ];

        dbStub = sinon.stub(Album, "find").returns({
            sort: sinon.stub().returns({
                skip: sinon.stub().returns({
                    limit: sinon.stub().returns({
                        populate: sinon.stub().returns({
                            exec: sinon.stub().yields(null, data),
                        }),
                    }),
                }),
            }),
        });

        return getAllSrv.getAll().then((result) => {
            expect(result.page).to.be.equal(1);
            expect(result.data.length).to.be.equal(2);
        });
    });
});
