"use strict"
const MailService = require("../services/MailService")


const { Note, sequelize } = require("../models/Note")
class NoteController {
    async index ({ request, response }) {
        try {
            const notes = await Note.all()
            await response.status(200).send(notes)
        } catch (err) {
            await response.status(err.status).send(err)
        }
    }
    async sendEmail ({ request }) {
        const message = {
            from: '',
            to: '',
            subject: "Test Send Email",
            template: 'teste',
            context: {
                title: "TEST"
            }
        }
        const config = {
            authUser: "",
            authPass: ""
        }
        let mailService = new MailService(message, config)
        mailService.send()
    }

    async show ({ request, response }) {
        const id = request.params.id
        const notes = await Note.find(id)
        await response.send(notes)
    }
    async store ({ request, response }) {
        const data = request.body
        try {
            const res = await Note.create(data)
            await response.status(200).send(res)
        } catch (err) {
            await response.status(err.status).send(err)
        }
    }
    async update ({ request, response }) {
        const id = request.params.id
        const data = request.body
        try {
            const res = await Note.update(data, { where: id })
            await response.status(200).send(res)
        } catch (err) {
            await response.status(err.status).send(err)
        }
    }
    async delete ({ request, response }) {
        const id = request.params.id
        try {
            const res = await Note.delete(id)
            await response.status(200).send(res)
        } catch (err) {
            await response.status(err.status).send(err)
        }
    }
}

module.exports = NoteController
