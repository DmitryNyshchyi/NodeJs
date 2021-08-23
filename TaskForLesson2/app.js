const express = require('express');
const path = require('path');

const { PORT } = require('../configs/config');
const { BAD_REQUEST, NOT_FOUND, CREATED, CONFLICT } = require('../configs/statusCodes.enum');
const { readFileFSPromise, writeFileFSPromise } = require('../utils');
const {
    NOT_CORRECT_EMAIL_PASSWORD_ERROR,
    USER_NOT_FOUND_ERROR,
    NOT_CORRECT_PASSWORD_ERROR,
    NOT_CORRECT_REPEAT_PASSWORD_ERROR,
    USER_EXIST_ERROR, CREATED_SUCCESS
} = require('../configs/messages.enum');

const app = express();
const viewsPath = path.join(__dirname, 'views');
const userPath = path.join(__dirname, 'dataBase', 'users.json');

const getUsers = async () => {
    const users = await readFileFSPromise(userPath);

    return JSON.parse(users);
};

const setUsers = async users => await writeFileFSPromise(userPath, JSON.stringify(users));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(viewsPath));

app.set('view engine', 'pug');
app.set('views', viewsPath);

app.post('/auth', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(BAD_REQUEST).end(NOT_CORRECT_EMAIL_PASSWORD_ERROR);
            return;
        }

        const users = await getUsers();
        const user = users.find(user => user.email === email);

        if (!user) {
            res.status(NOT_FOUND).end(USER_NOT_FOUND_ERROR);
            return;
        }

        if (user.password !== password) {
            res.status(BAD_REQUEST).end(NOT_CORRECT_PASSWORD_ERROR);
            return;
        }

        res.render('greeting', { title: `Hi, ${user.email}` });
    } catch (err) {
        console.error(err)
    }
});

app.post('/signup', async (req, res) => {
    try {
        const { email, password, repeatPassword } = req.body;

        if (!email || !password || !repeatPassword) {
            res.status(BAD_REQUEST).end(NOT_CORRECT_EMAIL_PASSWORD_ERROR);
            return;
        }

        if (email && password && repeatPassword && password !== repeatPassword) {
            res.status(BAD_REQUEST).end(NOT_CORRECT_REPEAT_PASSWORD_ERROR);
            return;
        }

        const users = await getUsers();
        const user = users.find(user => user.email === email);

        if (user) {
            res.status(CONFLICT).end(USER_EXIST_ERROR)
            return;
        }

        await users.push({ email, password });
        await setUsers(users);

        res.status(CREATED).end(CREATED_SUCCESS);
    } catch (err) {
        console.error(err)
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await getUsers();

        res.render('users', { title: 'Users', users });
    } catch (err) {
        console.error(err)
    }
})

app.get('/user/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const users = await getUsers();
        const user = await users.find(user => user.email === user_id);

        if (!user) {
            res.status(NOT_FOUND).end(USER_NOT_FOUND_ERROR);
            return;
        }

        res.render('user', { title: 'User', email: user.email });
    } catch (err) {
        console.error(err)
    }
})

app.get('/signup-page', (req, res) => {
    res.render('signup', { title: 'Sign up' });
})

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
})

app.get('/ping', (req, res) => {
    res.render('ping', { title: 'Ping endpoint', message: 'All Ok' });
});

app.listen(PORT, () => {
    console.log('App listen on port:', PORT);
});
