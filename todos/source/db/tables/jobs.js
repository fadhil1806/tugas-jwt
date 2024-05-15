const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const jobs = sequelize.define('jobs', {
    id_user: {
        type: DataTypes.INTEGER,
    },
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    }
}, {
    tableName: 'jobs',
    freezeTableName: false
})

module.exports = jobs