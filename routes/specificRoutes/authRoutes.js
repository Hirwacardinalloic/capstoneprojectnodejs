const { Router } =require('express');
const authController = require('../../controllers/authController');
const router = Router();

router.post('/login', authController.signIn);
// router.get('/logout', authController.logout);

//  router.post('/login/user', authController.register);
// router.get('/login', authController.getSignUp);


module.exports = router;