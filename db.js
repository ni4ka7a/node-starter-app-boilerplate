const mongoose = require('mongoose');
const config = require('./config');
const db = mongoose.connection;

const mongooseOptions = {
    // both options are because of old local mongo version
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const logger = {
    error: (message, err) => {
        console.log(`${message} error - ${err}`);
    },
    info: (message) => {
        console.log(`${message}`);
    }
};

(async function init() {
    db.on('error', err => {
        logger.error('DB Error: ', err);
    });

    db.on('close', () => {
        logger.error('DB connection closed.');
    });

    db.on('reconnect', () => {
        logger.info('DB reconnected.');
    });

    await mongoose.connect(config.DB_HOST, mongooseOptions);

    db.db.s.topology.on('reconnect', () => {
        logger.info('DB reconnected.');
    });
}());