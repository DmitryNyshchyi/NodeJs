module.exports = {
    CURRENT_YEAR: new Date().getFullYear(),
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%^&*])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    AUTHORIZATION: 'Authorization',
    MAX_IMAGE_SIZE: 5 * 1024 * 1024,
    IMAGES_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/png',
    ],
    RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15min
    RATE_LIMIT_MAX_REQUESTS: 1000,
};
