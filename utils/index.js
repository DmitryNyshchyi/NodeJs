const fs = require('fs');
const util = require('util');

module.exports = {
    renameFSPromise: util.promisify(fs.rename),
    readFileFSPromise: util.promisify(fs.readFile),
    readdirFSPromise: util.promisify(fs.readdir),
    statFSPromise: util.promisify(fs.stat),
}