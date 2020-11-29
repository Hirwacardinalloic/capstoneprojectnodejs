const express = require('express');
const router = express.Router();

router.use('/article', require('./specificRoutes/articleRoutes'));





module.exports = router;