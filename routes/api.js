const express = require('express');
const router = express.Router();

router.use('/article', require('./specificRoutes/articleRoutes'));

router.use('/auth', require('./specificRoutes/authRoutes'));



module.exports = router;