const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

router.use('/article',  require('./specificRoutes/articleRoutes'));

router.use('/auth', require('./specificRoutes/authRoutes'));

// router.post('/image', upload.single('image'), async (req, res)=>{
//     console.log('posting an image');
//   try{
//       const result = await cloudinary.uploader.upload(req.file.path);
//       res.json(result);
//   }catch(err) {
//     res.send(err);
//   }
// })



module.exports = router;