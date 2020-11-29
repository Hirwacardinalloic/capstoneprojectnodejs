const mongoose = require('mongoose');


const articleSchema = new mongoose.Schema ({
    articleTitle: {
        type: String,
        required: [true, 'Article title field required']
    },
    imageURL: String,
    date: {
        type: Date,
        default: Date.now,
        
    },
    content: {
        type: String,
        required: [true, 'Article content required']
    },
    publicationStatus: {
        type: Boolean,
        default: false
      
    }
});

const Article = mongoose.model('article', articleSchema);

module.exports= Article;