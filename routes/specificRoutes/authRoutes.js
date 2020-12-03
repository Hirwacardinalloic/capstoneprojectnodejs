const { Router } =require('express');
const authController = require('../../controllers/authController');
const router = Router();

router.get('/login', authController.signIn);
router.get('/logout', authController.logout);

router.post('/login', authController.register);

module.exports = router;