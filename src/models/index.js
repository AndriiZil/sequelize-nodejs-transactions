const { Sequelize } = require('sequelize');
const path = require('path');

const { error } = require('dotenv').config({ path: path.join(__dirname, '../../.env') });

if (error) {
    throw new Error('.ENV file is required.');
}

const db = {};

const { DATABASE, USER_NAME, HOST, PASSWORD } = process.env;

connect();

function connect() {
    try {
        const sequelize = new Sequelize(DATABASE, USER_NAME, PASSWORD, {
            host: HOST,
            dialect: 'mysql'
        });

        db.sequelize = sequelize;

        db.User = require('./User')(sequelize);
        db.Program = require('./Program')(sequelize);

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    db,
    sync: async (sequelize, force) => {
        try {
            await sequelize.sync({ force });
        } catch (err) {
            console.log(err);
        }
    }
};
