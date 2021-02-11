"use strict"

const { User, sequelize } = require("../../models/User/User")

class UserController {
    async index ({ request, response }) {
        try {
            const user = await User.all()
            await response.status(200).send(user)
        } catch (err) {
            await response.status(err.status).send(err)
        }
    }
    async show ({ request, response }) {
        const id = request.params.id
        const user = await User.find(id)
        await response.send(user)
    }
    async store ({ request, response }) {
        const data = request.body
        try {
            const user = await User.create(data)
            await response.status(200).send(user)
        } catch (err) {
            await response.status(err.status).send(err)
        }
    }
    async update ({ request, response }) {
        const id = request.params.id
        const data = request.body
        try {
            const res = await User.update(data, { where: id })
            await response.status(200).send(res)
        } catch (err) {
            await response.status(err.status).send(err)
        }
    }
    async delete ({ request, response }) {
        const id = request.params.id
        try {
            const res = await User.delete(id)
            await response.status(200).send(res)
        } catch (err) {
            await response.status(err.status).send(err)
        }
    }
}

module.exports = UserController
