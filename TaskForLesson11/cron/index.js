const cron = require('node-cron');

const removeExpiredTokens = require('./removeExpiredTokens');

module.exports = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log(`[INFO]: Cron start at ${new Date().toISOString()}`);
        await removeExpiredTokens();
        console.log(`[INFO]: Cron finished at ${new Date().toISOString()}`);
    });
};
