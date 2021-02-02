const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Note = sequelize.define("note", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        }
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

module.exports = Note
