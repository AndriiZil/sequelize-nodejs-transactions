const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Program', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
};
