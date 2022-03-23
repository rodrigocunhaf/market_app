const express = require('express');
const route = express.Router();
const UserController = require("./controller");
const authentication = require('../middleware/authentication');

route.post('/users/create', UserController.createController );

route.post('/users/login', UserController.loginUser );

module.exports = route;