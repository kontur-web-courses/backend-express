const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    const auth = req.query.auth === 'true';
    if (!auth) {
        res.status(401).send('Not authorized');
    }
    else {
        next();
    }
});
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
