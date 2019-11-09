const request = require("supertest")
const app = require("../../src/main")

const session = async () => {
    const response = await request(app)
        .post("/users/session")
        .send({ email: "axsilvasousa@gmail.com", password: "123456" })
    return response.body.token
}

describe("Tags", () => {
    it("should search a tag", async done => {
        const token = await session()

        const response = await request(app)
            .get("/tools?search=http&is_tag=true")
            .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
        done()
    })

    it("should search tag that doesn't exist", async done => {
        const token = await session()
        const response = await request(app)
            .get("/tools?search=mariadb&is_tag=true")
            .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(204)
        done()
    })

    it("should list all tags", async done => {
        const token = await session()
        const response = await request(app)
            .get("/tags")
            .set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(200)
        done()
    })
})
