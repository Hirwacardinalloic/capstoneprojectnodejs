const express =require('express');
const router = express.Router();
const commentsController = require('../../controllers/commentsController');

router.get('/:id', commentsController.getCommentsBYArticles);
router.post('/', commentsController.addComment);



module.exports = router;