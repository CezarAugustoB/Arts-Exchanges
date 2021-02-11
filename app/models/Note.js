const { DataTypes } = require("sequelize")
const sequelize = require("../../config/database")
const { User } = require("./User/User")

const Note = sequelize.define("note", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { timestamps: true, freezeTableName: true })

Note.belongsTo(User)

Note.all = async () => {
    return await Note.findAll()
}
Note.find = async (id) => {
    return await Note.findAll({
        where: { id },
        include: [
            {
                model: User,
                as: "user",
                attributes: ["name"]
            },
        ],
    })
}
Note.delete = async (id) => {
    await Note.destroy({
        where: { id }
    })
    return true
}



module.exports = { Note, sequelize }
