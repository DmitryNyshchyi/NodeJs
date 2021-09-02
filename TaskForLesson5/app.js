const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const { authRouter, userRouter } = require('./router');
const { config } = require('../configs');

mongoose
    .connect('mongodb://localhost:27017/inoxoft_db')
    .then(() => console.log('Successfully connected to mongodb'));

const app = express();
const viewsPath = path.join(__dirname, 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(viewsPath));

app.set('view engine', 'pug');
app.set('views', viewsPath);

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use(_mainErrorHandler);

app.get('/signup-page', (req, res) => {
    res.render('signup', { title: 'Sign up' });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

app.get('/ping', (req, res) => {
    res.render('ping', { title: 'Ping endpoint', message: 'All Ok' });
});

app.listen(config.PORT, () => console.log('App listen on port:', config.PORT));

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Unknown error'
        });
}
