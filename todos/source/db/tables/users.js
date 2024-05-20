const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    freezeTableName: false,
})

module.exports = users