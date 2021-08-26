const { dirname, join } = require('path');

const { readFileFSPromise, writeFileFSPromise } = require('../../utils');

const userPath = join(dirname(__dirname), 'dataBase', 'users.json');

module.exports = {
    getUsers: async () => {
        const users = await readFileFSPromise(userPath);

        return JSON.parse(users);
    },

    setUsers: async (users) => {
        await writeFileFSPromise(userPath, JSON.stringify(users));
    },

    getUserByEmail: async (email) => {
        const users = await readFileFSPromise(userPath);

        return JSON
            .parse(users)
            .find((userData) => userData.email === email);
    },

    getUserByEmailInArray: (email, users) => users.find((userData) => userData.email === email),
};
