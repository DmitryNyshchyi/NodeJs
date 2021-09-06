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
};
