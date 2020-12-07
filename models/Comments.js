const mongoose = require('mongoose');
const { isEmail } = require('validator');
const commentSchema = new mongoose.Schema({
    articleIdentifier: {
        type: String,
        required: true
    },
    commentSender: {
        type: String,
        required: true
    },
    senderEmail: {
        type: String,
        required: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    comment: {
        type: String,
        required: true
    }

});
const Comments = mongoose.model('comment', commentSchema);

module.exports = Comments;
