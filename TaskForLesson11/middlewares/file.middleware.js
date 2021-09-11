const ErrorHandler = require('../errors/ErrorHandler');
const { statusCodes, constants } = require('../../configs');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            if (req.files && req.files.avatar) {
                const { name, size, mimetype } = req.files.avatar;

                if (!constants.IMAGES_MIMETYPES.includes(mimetype)) {
                    throw new ErrorHandler(statusCodes.BAD_REQUEST, `Wrong file format ${name}`);
                }

                if (size > constants.MAX_IMAGE_SIZE) {
                    const maxSize = _getSizeViewInMB(constants.MAX_IMAGE_SIZE);
                    const currentSize = _getSizeViewInMB(size);

                    throw new ErrorHandler(
                        statusCodes.BAD_REQUEST,
                        `File ${name} is too big. Max size: ${maxSize}MB, Yours: ${currentSize}MB.`
                    );
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

function _getSizeViewInMB(dataSize) {
    return (dataSize / 1024 / 1024).toFixed(0);
}
