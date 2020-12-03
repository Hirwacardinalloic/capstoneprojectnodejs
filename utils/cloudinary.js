const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_API_KEY,
    api_secret: process.env.coudinary_API_SECRET
});

module.exports = cloudinary;