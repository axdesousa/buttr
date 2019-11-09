const request = require("supertest")
const app = require("../../src/main")

const dados = { name: "Ax Silva Sousa", email: "axsilvasousa@gmail.com", password: "123456" }

describe("User", () => {
    it("should create an user", async done => {
        const user = await request(app)
            .post("/users")
            .send(dados)
        expect(user.status).toBe(201)
        done()
    })

    it("should not create a user by passing an existing email", async done => {
        const response = await request(app)
            .post("/users")
            .send(dados)

        expect(response.status).toBe(406)
        done()
    })

    it("login passing a invalid email", async done => {
        const response = await request(app)
            .post("/users/session")
            .send({ email: "axsilvasousadev@gmail.com", password: "123456" })

        expect(response.status).toBe(401)
        done()
    })

    it("login passing a invalid password", async done => {
        const response = await request(app)
            .post("/users/session")
            .send({ email: dados.email, password: "123" })

        expect(response.status).toBe(401)
        done()
    })

    it("login passing a valid user", async done => {
        const response = await request(app)
            .post("/users/session")
            .send({ email: dados.email, password: dados.password })

        expect(response.status).toBe(200)
        done()
    })

    it("Acess a route private passing a valid token", async done => {
        const session = await request(app)
            .post("/users/session")
            .send({ email: dados.email, password: dados.password })

        const response = await request(app)
            .get("/tools")
            .set("Authorization", `Bearer ${session.body.token}`)
        expect(response.status).toBe(200)
        done()
    })
})
