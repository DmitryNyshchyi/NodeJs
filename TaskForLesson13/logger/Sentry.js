const Sentry = require('@sentry/node');

const { SENTRY_DSN } = require('../../configs/config');

Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1.0,
});

module.exports = Sentry;
