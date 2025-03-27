const express = require('express');
const pathHandler = require('path');
const cookieHandler = require('cookie-parser');
const logMiddleware = require('morgan');

const mainRoute = require('./routes/index');
const userRoute = require('./routes/users');
const qs = require("node:querystring");

const server = express();

server.use(logMiddleware('dev'));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cookieHandler());
server.use(express.static(pathHandler.join(__dirname, 'public')));

server.use((request, response, proceed) => {
    const authCheck = request.query.auth;
    if (authCheck !== 'true') {
        response.status(401).json({error: 'Not authorized'});
        return;
    }
    proceed();
});

server.use('/', mainRoute);
server.use('/users', userRoute);

module.exports = server;
