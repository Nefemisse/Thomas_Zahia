
const express = require('express');
const route = express.Router();
const userCtrl = require('../controllers/userCtrl');
 
 //login
 
route.get('/',(req,res)=>{res.render('login');})
route.post('/', userCtrl.logUser);

route.get('/getUserToken', userCtrl.getUserByToken);

//register
route.get('/register',(req,res)=>{res.render('register');})
route.post('/register',userCtrl.addUser)

//profil
// route.get('/profile',(req,res)=>{
//     res.render('profile');
// })
route.get('/profile', userCtrl.getUserByToken);


route.get('/logout',userCtrl.logOut)
// route.get('/getUserById/:id',userCtrl.getUserById);
// route.get('/allUsers', userCtrl.getAllUsers);




 

module.exports = route;
