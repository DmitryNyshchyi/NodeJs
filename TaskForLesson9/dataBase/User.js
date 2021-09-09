const { Schema, model } = require('mongoose');

const { dataBaseTables, userRoles } = require('../../configs');
const { passwordService } = require('../../TaskForLesson5/services');
const { userNormalizator } = require('../../utils');

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
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

userSchema
    .virtual('fullName')
    .get(function() {
        return this.name ? `${this.name} ${this.email}` : this.email;
    });

userSchema.methods = { // this - record
    validatePassword(password) { // TODO FMI validatePassword
        return passwordService.compare(password, this.password);
    }
};

userSchema.statics = { // this - schema
    async createWithHashPassword(userObject, isNormalizedUser = false) {
        const hashedPassword = await passwordService.hash(userObject.password);
        const newUser = await this.create({ ...userObject, password: hashedPassword });

        if (isNormalizedUser) {
            return userNormalizator(newUser)();
        }

        return newUser;
    }
};

module.exports = model(dataBaseTables.USER, userSchema);
