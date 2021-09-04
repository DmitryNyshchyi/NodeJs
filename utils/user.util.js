module.exports = {
    userNormalizator: (userToNormalize) => (filedToRemove = [
        'password',
        '__v'
    ]) => {
        const user = userToNormalize.toObject();

        filedToRemove.forEach((filed) => delete user[filed]);

        return user;
    }
};
