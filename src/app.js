const server = require('./configuration/server/server.js');
const express = require('express');
const userRoutes = require('./modules/user/routes.js');
const cors = require('cors');

server.use(express.urlencoded({extended:true}))
server.use(express.json());
server.use(cors());

server.use(userRoutes);
