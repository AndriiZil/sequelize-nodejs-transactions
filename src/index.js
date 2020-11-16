const express = require('express');

const { db, sync } = require('./models');

sync(db.sequelize, false).catch(console.log);

const app = express();

app.get('/', (req, res) => res.send('ok'));

app.post('/', async (req, res) => {
    const transaction = await db.sequelize.transaction(); // Create transaction

    try {
        await db.User.create({ name: 'Vova' }, { transaction }); // pass transaction object

        await transaction.commit(); // Commit changes

        res.send('ok');
    } catch (err) {
        await transaction.rollback(); // Rollback if error

        console.log(err);
        res.status(422).send({ message: 'Error' });
    }
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
