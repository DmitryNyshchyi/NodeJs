const { Schema, model } = require('mongoose');

const { dataBaseTables } = require('../../configs');

const OAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    [dataBaseTables.USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dataBaseTables.USER
    },
}, { timestamps: true });

module.exports = model(dataBaseTables.OAUTH, OAuthSchema);
