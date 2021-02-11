const { DataTypes } = require("sequelize")
const sequelize = require("../../../config/database")

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { timestamps: true, freezeTableName: true })

module.exports = { User, sequelize }
