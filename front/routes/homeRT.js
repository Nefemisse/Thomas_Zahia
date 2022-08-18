const express = require('express');
const route = express.Router();
const postCtrl = require('../controllers/postCtrl');


route.get('/home',postCtrl.getPostAll); 



module.exports = route;