const cors = require('cors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

require('dotenv').config();

const { authRouter, userRouter } = require('./router');
const { config, constants, messages } = require('../configs');
const cronJobs = require('./cron');

mongoose
    .connect(config.DB_CONNECT_URL)
    .then(() => console.log('Successfully connected to mongodb'));

const app = express();
const viewsPath = path.join(__dirname, 'views');

app.use(cors({ origin: _configureCors }));

app.use(rateLimit({
    windowMs: constants.RATE_LIMIT_WINDOW_MS,
    max: constants.RATE_LIMIT_MAX_REQUESTS
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(viewsPath));
app.use(expressFileUpload());
app.use(helmet());

if (process.env.ENVIRONMENT === 'dev') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

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

app.listen(config.PORT, () => {
    console.log('App listen on port:', config.PORT);
    cronJobs();
});

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({ message: err.message || 'Unknown error' });
}

function _configureCors(origin, callback) {
    const whiteList = config.ALLOWED_ORIGIN.split(';');

    if (origin && !whiteList.includes(origin)) {
        return callback(new Error(messages.CORS_NOT_ALLOWED_ERROR), false);
    }

    return callback(null, true);
}
