const express = require('express');
const route = express.Router();
const postCtrl = require('../controllers/postCtrl');
const multer = require("multer");
// var upload = multer({ dest: 'public/imag/uploads/' })

const storage = multer.diskStorage({
 destination: function (req, file, callback) {
        callback(null, 'public/img/uploads/');
    },
    filename: function(req, file, callback)  {
        callback(null, file.originalname);
    }
 })

 var upload = multer({ storage: storage });

route.get('/home',postCtrl.getAllPosts); 
route.post('/home',upload.single('attachments'), postCtrl.createPost);

route.delete('/deletePost', postCtrl.deletePost); 
route.get('/deletePost', postCtrl.deletePost); 
// route.post('/home', postCtrl.updatePost); 

module.exports = route;