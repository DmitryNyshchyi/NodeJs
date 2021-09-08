const { Schema, model } = require('mongoose');

const { dataBaseTables, userRoles } = require('../../configs');

const userSchema = new Schema({
    name: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    }
}, { timestamps: true });

module.exports = model(dataBaseTables.USER, userSchema);
