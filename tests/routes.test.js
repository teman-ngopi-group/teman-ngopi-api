const request = require("supertest");
const app = require("../app");

describe("Get route", () => {
  it("page return welcome to node-user-crud", async (done) => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    done();
  });
});

afterAll(async () => {
  await app.close();
});
