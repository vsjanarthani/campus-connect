const { Schema } = require('mongoose');

const reactionSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
);

module.exports = reactionSchema;

// Reaction models needs messageId and UserID!