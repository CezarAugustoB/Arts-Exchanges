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

Note.all = async () => {
    const query = "SELECT note.*, user.nome FROM note JOIN user ON user.id = note.userId "
    return await sequelize.query(query)
}
Note.find = async (id) => {
    const query = "SELECT note.*, user.nome FROM note JOIN user ON user.id = note.userId WHEREs note.id = $id"
    return await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        bind: { id }
    })
}
Note.delete = async (id) => {
    const query = "DELETE note WHERE note.id = $id"
    return await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        bind: { id }
    })
}

module.exports = { Note, sequelize }
