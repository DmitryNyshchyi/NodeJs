const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const ErrorHandler = require('../../TaskForLesson4/errors/ErrorHandler');
const { config, statusCodes, messages } = require('../../configs');
const templatesInfo = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(__dirname, '../email-templates')
    }
});

const trasporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_BROADCAST,
        pass: config.EMAIL_BROADCAST_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateData = templatesInfo[emailAction];

    if (!templateData) {
        throw new ErrorHandler(statusCodes.SERVER_ERROR, messages.WRONG_TEMPLATE_NAME_ERROR);
    }

    const { templateName, subject } = templateData;

    const html = await templateParser.render(templateName, { ...context, fromEmail: `mailto:${config.EMAIL_BROADCAST}` });

    return trasporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject,
        html
    });
};

module.exports = {
    sendMail
};
