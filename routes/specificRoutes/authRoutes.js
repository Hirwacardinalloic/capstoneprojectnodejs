const { Router } =require('express');
const authController = require('../../controllers/authController');
const router = Router();

router.get('/login', authController.getSignUp);

router.post('/login', authController.postSignUp);

module.exports = router;