module.exports = {
    userNormalizator: (userToNormalize) => (filedToRemove = [
        'password',
        '__v'
    ]) => {
        filedToRemove.forEach((filed) => {
            // eslint-disable-next-line no-param-reassign
            delete userToNormalize[filed];
        });

        return userToNormalize;
    }
};
