const express = require('express');
const path = require('path');

const { PORT } = require('../configs/config');
const { authRouter, userRouter } = require('./router');

const app = express();
const viewsPath = path.join(__dirname, 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(viewsPath));

app.set('view engine', 'pug');
app.set('views', viewsPath);

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.get('/signup-page', (req, res) => {
    res.render('signup', { title: 'Sign up' });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

app.get('/ping', (req, res) => {
    res.render('ping', { title: 'Ping endpoint', message: 'All Ok' });
});

app.listen(PORT, () => console.log('App listen on port:', PORT));
