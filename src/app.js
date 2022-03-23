const server = require('./configuration/server/server.js');
const express = require('express');
const userRoutes = require('./modules/user/routes.js');

server.use(express.urlencoded({extended:true}))
server.use(express.json());

server.use(userRoutes);
