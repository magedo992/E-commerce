const cloudinary=require('cloudinary').v2;
(async function () {
    cloudinary.config({
        cloud_name:'duscvark1',
        api_key:process.env.api_key,
        api_secret: process.env.API_secret
    })
    
})

