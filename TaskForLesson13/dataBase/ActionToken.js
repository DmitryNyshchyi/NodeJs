const { Schema, model } = require('mongoose');

const { dataBaseTables } = require('../../configs');

const ActionTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    [dataBaseTables.USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dataBaseTables.USER
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

ActionTokenSchema.pre('findOne', function() {
    this.populate(dataBaseTables.USER);
});

module.exports = model(dataBaseTables.ACTION_TOKEN, ActionTokenSchema);
