const express = require('express');
const connectionDatabase = require('../db/connectionDatabase.js');
const environmentSelector = require('../environment/environmentSelector.js');

const server = express();

const port = process.env.PORT || 8080;

server.listen( port , () => {
    console.log(`Server listening on port ${port}`);
    connectionDatabase().then( () => {
        console.log("database connected.");

    }).catch ( err => {
        console.log('Failed to connect database.')
    });
});

module.exports = server;

