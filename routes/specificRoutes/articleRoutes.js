const express =require('express');
const router = express.Router();
const Article = require('../../models/Article');

//Getting published articles from db
router.get('/published', (req, res, next)=>{
    Article.find({publicationStatus: true}).then(articles=>{
        res.json(articles);
    });
});
//Getting unPublished articles from db
router.get('/unpublished', (req, res, next)=>{
    Article.find({publicationStatus: false}).then(articles=>{
        res.json(articles);
    });
});
//Retrieving a particular article from db
router.get('/:id', (req, res, next)=>{
    Article.findOne({_id: req.params.id}).then(updatedArticle=>{
        res.send(updatedArticle);
    });
});

//Adding an article in the db
router.post('/', (req, res, next)=>{
    //creating an article and saving it in db
    Article.create(req.body).then(article=>{
        res.send(article);
    }).catch(next);
    
});
//Updating an article in db
router.put('/:id', (req, res, next)=>{
    Article.findByIdAndUpdate({_id: req.params.id},req.body).then(()=>{
        Article.findOne({_id: req.params.id}).then(updatedArticle=>{
            res.send(updatedArticle);
        })
    });
});

//Deleting an article in the db
router.delete('/:id', (req, res, next)=>{
    Article.findByIdAndRemove({_id: req.params.id}).then(deletedArticle=>{
        res.send(deletedArticle);
    })
});

module.exports = router;
