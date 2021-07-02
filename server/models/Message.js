const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema(
    {
        msg: {
            type: String,
            required: true,
            trim: true
        },
        from: {
            type: String,
            required: true,
            trim: true
        },
        to: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

messageSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Message = model('Message', messageSchema);

module.exports = Message;