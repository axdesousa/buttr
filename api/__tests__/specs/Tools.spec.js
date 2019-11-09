const request = require("supertest")
const faker = require("faker")
const app = require("../../src/main")

const dados = {
    title: faker.lorem.words(3),
    link: faker.internet.url,
    description: faker.lorem.sentence(5),
    tags: [faker.hacker.adjective(), faker.hacker.adjective(), faker.hacker.adjective()]
}

const express = {
    title: "express",
    link: "http://json-server.com",
    description: "lorem ipsum dolor set ipsum",
    tags: ["server", "nodejs", "http", "rest"]
}

const session = async () => {
    const response = await request(app)
        .post("/users/session")
        .send({ email: "axsilvasousa@gmail.com", password: "123456" })
    return response.body.token
}
describe("Tool", () => {
    it("should create tool", async done => {
        const token = await session()
        const response = await request(app)
            .post("/tools")
            .set("Authorization", `Bearer ${token}`)
            .send(dados)
        expect(response.status).toBe(201)
        done()
    })

    it("should detail tool", async done => {
        const token = await session()
        const response = await request(app)
            .get("/tools/1")
            .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
        done()
    })

    it("should search a tool", async done => {
        const token = await session()
        await request(app)
            .post("/tools")
            .set("Authorization", `Bearer ${token}`)
            .send(express)

        const response = await request(app)
            .get("/tools?search=expre")
            .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
        done()
    })

    it("should search tool that doesn't exist", async done => {
        const token = await session()
        const response = await request(app)
            .get("/tools?search=mariadb")
            .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(204)
        done()
    })

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

    it("should update tool", async done => {
        const token = await session()
        const response = await request(app)
            .put("/tools/1")
            .set("Authorization", `Bearer ${token}`)
            .send({ ...dados, description: "lorem ipson update" })
        expect(response.status).toBe(200)
        done()
    })

    it("should delete tool", async done => {
        const token = await session()
        const tool = await request(app)
            .post("/tools")
            .set("Authorization", `Bearer ${token}`)
            .send({ ...dados, title: "lorem" })

        const response = await request(app)
            .delete(`/tools/${tool.body.id}`)
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
