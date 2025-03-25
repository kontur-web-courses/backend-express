var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    const authParam = req.query.auth;
    if (authParam === 'true') {
        next();
    } else {
        res.status(401).send("not auth");
    }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
