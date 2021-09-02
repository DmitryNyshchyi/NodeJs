const fs = require('fs');
const util = require('util');

const user = require('./user.util');

module.exports = {
    renameFSPromise: util.promisify(fs.rename),
    readFileFSPromise: util.promisify(fs.readFile),
    writeFileFSPromise: util.promisify(fs.writeFile),
    appendFileFSPromise: util.promisify(fs.appendFile),
    readdirFSPromise: util.promisify(fs.readdir),
    statFSPromise: util.promisify(fs.stat),
    userNormalizator: user.userNormalizator,
};
