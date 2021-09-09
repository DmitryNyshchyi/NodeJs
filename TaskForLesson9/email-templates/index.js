const { emailActions } = require('../../configs');

module.exports = {
    [emailActions.WELCOME]: {
        templateName: emailActions.WELCOME,
        subject: 'Welcome to the course Node.js'
    },

    [emailActions.GOODBYE]: {
        templateName: emailActions.GOODBYE,
        subject: 'Have a nice day. See you!'
    },

    [emailActions.FORGOT_PASSWORD]: {
        templateName: emailActions.FORGOT_PASSWORD,
        subject: 'Forgot password'
    },

    [emailActions.CREATE_NEW_ADMIN]: {
        templateName: emailActions.CREATE_NEW_ADMIN,
        subject: 'Create new admin'
    },
};
