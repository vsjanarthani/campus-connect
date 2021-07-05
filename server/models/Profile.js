const { Schema } = require('mongoose');

const profileSchema = new Schema(
    {
        imageUrl: {
            type: String,
        },
        funLogo: {
            type: String,
            default: "https://res.cloudinary.com/www-actionnetwork-com/image/upload/v1625022844/Frame_5_jpasit.png"
        },
        businessLogo: {
            type: String,
            default: "https://res.cloudinary.com/www-actionnetwork-com/image/upload/v1625021118/javascript_uzzfmq.png"
        },
        linkedin: {
            type: String,
        },
        Github: {
            type: String,
        },
        Instagram: {
            type: String,
        }
    },
);

module.exports = profileSchema;

// Reaction models needs messageId and UserID!