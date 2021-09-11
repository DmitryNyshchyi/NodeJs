module.exports = {
    PORT: process.env.PORT || 5000,
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',
    DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/inoxoft_db',

    FORGOT_PASSWORD_TOKEN_SECRET: process.env.FORGOT_PASSWORD_TOKEN_SECRET || 'word',
    CREATE_NEW_ADMIN_TOKEN_SECRET: process.env.CREATE_NEW_ADMIN_TOKEN_SECRET || 'word',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'word',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh_word',

    EMAIL_BROADCAST: process.env.EMAIL_BROADCAST || 'test@gmail.com',
    EMAIL_BROADCAST_PASSWORD: process.env.EMAIL_BROADCAST_PASSWORD || '123456',

    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL || 'test@gmail.com',
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD || '123456',

    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
    AWS_S3_REGION: process.env.AWS_S3_REGION,

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000;http://localhost:5000',
};
