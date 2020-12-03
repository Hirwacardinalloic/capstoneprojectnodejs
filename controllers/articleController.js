const Article = require('../models/Article');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const jwt = require('jsonwebtoken');
// const { requireAuth } = require('../middleware/authMiddleware');

module.exports.getunPublishedArticles = (req, res, next)=>{
    // const token = req.cookies.jwt;
    // console.log(token);
    Article.find({publicationStatus: false}).then(articles=>{
        res.json(articles);
    }).catch(next);
}

module.exports.getPublishedArticles = (req, res, next)=>{
    Article.find({publicationStatus: true}).then(articles=>{
        res.json(articles);
    });
}

module.exports.getParticularArticle = (req, res, next)=>{
   
    Article.findOne({_id: req.params.id}).then(article=>{
        res.json(article);
    });
}

module.exports.addArticle =  (req, res, next)=>{
    //creating an article and saving it in db
    Article.create(req.body).then(article=>{
        res.json(article);
    }).catch(next);
}
   


module.exports.updateArticle = (req, res, next)=>{
    Article.findByIdAndUpdate({_id: req.params.id},req.body).then(()=>{
        Article.findOne({_id: req.params.id}).then(updatedArticle=>{
            res.send(updatedArticle);
        })
    });
}

module.exports.deleteArticle = (req, res, next)=>{
    Article.findByIdAndRemove({_id: req.params.id}).then(deletedArticle=>{
        res.send(deletedArticle);
    })
}