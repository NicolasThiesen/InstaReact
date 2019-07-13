const PostController = require('./controllers/PostController');
const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload.js');
const LikeController = require("./controllers/LikeController");
const Girar = require('./controllers/Girar_Imagem');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts',PostController.index);
routes.post('/posts', upload.single("image") ,PostController.store);
routes.post('/posts/:id/like',LikeController.store);
routes.post('/posts/girar',upload.single("image"),Girar.store);

module.exports = routes;