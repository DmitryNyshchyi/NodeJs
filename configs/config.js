module.exports = {
    PORT: process.env.PORT || 5000,
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',
    DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/inoxoft_db',
    FORGOT_PASSWORD_TOKEN_SECRET: process.env.FORGOT_PASSWORD_TOKEN_SECRET || 'word',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'word',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh_word',
    EMAIL_BROADCAST: process.env.EMAIL_BROADCAST || 'test@gmail.com',
    EMAIL_BROADCAST_PASSWORD: process.env.EMAIL_BROADCAST_PASSWORD || '123456'
};
