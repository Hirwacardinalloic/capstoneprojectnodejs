const Comments = require('../models/Comments');

module.exports.getCommentsBYArticles = async (req, res, next)=>{
        
        
           try{
                const comments = await Comments.find({articleIdentifier: req.params.id});
                res.json(comments);
           }catch(err) {
               res.status(402).send(err);
           }
       
}

module.exports.addComment = async (req, res)=>{
    const comment = new Comments({
        articleIdentifier: req.body.articleIdentifier,
        commentSender: req.body.commentSender,
        senderEmail: req.body.senderEmail,
        comment: req.body.comment
    });

       await comment.save().then(data=>{
          res.json({message: "comment added", comment: data});
        }).catch(err=>{
            res.status(422).send(err);
        });
   
}
