const request = require("supertest")
const app = require("../../src/main")

describe("App", () => {
    it("Acess index Api", async done => {
        const response = await request(app).get("/")
        expect(response.status).toBe(200)
        done()
    })

    it("Acess a route private withoult token", async done => {
        const response = await request(app).get("/tools")
        expect(response.status).toBe(401)
        done()
    })

    it("Acess a route private passing a invalid token", async done => {
        const response = await request(app)
            .get("/tools")
            .set("Authorization", "Bearer 1234")
        expect(response.status).toBe(401)
        done()
    })
})
