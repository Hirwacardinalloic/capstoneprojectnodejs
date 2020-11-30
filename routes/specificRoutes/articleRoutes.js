const express =require('express');
const router = express.Router();
const articleController = require('../../controllers/articleController');

//Getting published articles from db
router.get('/published', articleController.getPublishedArticles);
//Getting unPublished articles from db
router.get('/unpublished', articleController.getunPublishedArticles);
//Retrieving a particular article from db
router.get('/:id', articleController.getParticularArticle);

//Adding an article in the db
router.post('/', articleController.addArticle);
//Updating an article in db
router.put('/:id', articleController.updateArticle);

//Deleting an article in the db
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
