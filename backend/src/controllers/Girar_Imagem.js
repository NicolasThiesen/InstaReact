const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const multer = require('multer');

module.exports = {
    async store(req,res){

        const { filename: image } = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        
        await sharp(req.file.path)
            .rotate(90)
            .resize(500)
            .jpeg({quality:70})
            .toFile(
                path.resolve(req.file.destination, 'resized' , fileName)
            )
            
        return res.json({ok:true});
    }
}