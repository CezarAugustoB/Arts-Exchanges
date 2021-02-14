const { DataTypes } = require("sequelize")
const sequelize = require("../../config/database")

const Log = sequelize.define("log", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, { timestamps: true, freezeTableName: true })

module.exports = { Log, sequelize }