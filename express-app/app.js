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

app.use('/', indexRouter);

const authMiddleware = (req, res, next) => {
  if (req.query.auth === 'true') {
    next();
  } else {
    res.status(401).send('Access Denied');
  }
};

app.use('/users', authMiddleware, usersRouter);

module.exports = app;
