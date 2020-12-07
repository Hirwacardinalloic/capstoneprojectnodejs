const Article = require('../models/Article');


module.exports.getunPublishedArticles = (req, res, next)=>{
    Article.find({publicationStatus: false}).then(articles=>{
        res.json(articles);
    });
}

module.exports.getPublishedArticles = (req, res, next)=>{
    Article.find({publicationStatus: true}).then(articles=>{
        res.json(articles);
    });
}

module.exports.getParticularArticle = async (req, res, next)=>{
   
    try{
        const article= await Article.findOne({_id: req.params.id});
        res.send({article: article});
    }catch(err){
        res.status(404).send({message: 'Article not found'});

    }
    
}

module.exports.addArticle = async (req, res)=>{
    //creating an article and saving it in db
    let article = new Article({
        articleTitle: req.body.articleTitle,
             content: req.body.content
    });
     try{
        const savedArticle = await article.save().then(data=>{
            res.json({message: 'article saved successfully', article: data});
        });
        
    }catch(err){
        res.status(422).json(err);
    }
    
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