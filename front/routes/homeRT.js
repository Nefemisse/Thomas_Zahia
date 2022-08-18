const express = require('express');
const route = express.Router();
const postCtrl = require('../controllers/postCtrl');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/img/');
    },
    filename: function(req, file, callback)  {
        callback(null, file.originalname);
    }
})
const upload = multer({ storage: storage });

route.get('/home',postCtrl.createPost);
route.get('/home',postCtrl.getAllPosts); 
route.post('/home',upload.single('attachment'), postCtrl.createPost);



module.exports = route;