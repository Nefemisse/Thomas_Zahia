// Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncLib = require('async');
const models = require('../models');
const cookieParser = require('cookie-parser');
const jwtUtils = require('../utils/jwt.utils');
const dotenv = require('dotenv').config();

// REGEX
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[æÆÐ!@#&$()[{.\]\}-])(?=.*[éêëèåàäâáãïîöôüûyÿŷÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÖÔÕÙÚÛÜÝŶŶ]).{4,255}$/

//Routes
module.exports = {
    register: (request, response) => {
        // Parameters
        let lastName = request.body.lastName;
        let firstName = request.body.firstName;
        let email = request.body.email;
        let password = request.body.password;

        // Fields verification
        if (lastName == "" || firstName == "" || email == "" || password == "") {
            return response.status(400).json({'error': 'An error occured : Missing parameters'});
        }
        
        if (!EMAIL_REGEX.test(email)) {
            return response.status(400).json({'error': 'An error occured : email is not valid'})
        }
        
        if (!PASWORD_REGEX.test(password)) {
            console.log(password);
            return response.status(400).json({'error': 'An error occured : password invalid (must length 4 - 18 and include 1 number)'})
        }

        // Waterfall
        asyncLib.waterfall([
            (done) => {
                models.Users.findOne({
                    attributes: ['email'],
                    where: { email: email}
                })
                .then((userFound) => {
                    done(null, userFound);
                })
                .catch((err) => {
                    return response.status(400).json({'error': 'An error occured'});
                });
            },
            (userFound, done) => {
                !userFound ? bcrypt.hash(password, 5, (err, bcryptedPassword) => { done(null, userFound, bcryptedPassword) }) : response.status(409).json({'error': 'user already exist.'})
            },
            (userFound, bcryptedPassword, done) => {
                let newUser = models.Users.create({
                    lastName: lastName,
                    firstName: firstName,
                    email: email,
                    password: bcryptedPassword
                })
                .then((newUser) => {
                    done(newUser);
                })
                .catch((err) => {
                    console.log(err)
                    return response.status(500).json({'error': 'An error occurred : unable to verify user'})
                });
            }
        ],
        (newUser) => {
            newUser ? response.status(201).json({'userId': newUser.id, 'sucess': `User : ${lastName} ${firstName} successfully created`}) : response.status(400).json({ 'error': 'An error occurred : user already exist.'}) 
        })
    },
    update: (request, response) => {
        // Parameters
        const id = request.params.id;
        let lastName = request.body.lastName;
        let firstName = request.body.firstName;
        let email = request.body.email;
        let password = request.body.password;   
        
        // Waterfall
        asyncLib.waterfall([
            (done) => {
                models.Users.findOne({
                    attributes: [ 'id', 'email', 'firstName', 'lastName', 'password'],
                    where: { id: id}
                })
                .then((userFound) => {
                    done(null, userFound);
                })
                .catch((err) => {
                    return response.status(400).json({ 'error': 'Unable to verify user' });
                });
            },
            (userFound, done) => {
                userFound ? userFound.update({
                    lastName: (lastName ? lastName : userFound.lastName),
                    firstName: (firstName ? firstName : userFound.firstName),
                    email: (email ? email : userFound.email),
                    password: (password ? password : userFound.password)
                }).then((userFound) => {done(userFound)}).catch((err) => { response.status(400).json({ 'error': 'An error occurred : unable to update' }) }) : response.status(404).json({ 'error': 'An error occurred : user not found' });
            },
        ],  
            (userFound) => { userFound ? response.status(200).json({'success': `User : '${lastName} ${firstName}' successfuly modified`}) : response.status(400).json({ 'error': 'An error occurred' }) }
        )          
    },
    getUserMe: (request, response, next) => {

        let headerAuth = request.cookies.auth;
        //const usersId = jwtUtils.getUsersId(headerAuth)
        const usersId = request.body.id

        if(usersId < 0) {
            return response.status(400).json({error: 'An error occured: wrong token'});
        }

        models.Users.findOne({
            attributes: ['id', 'lastName', 'firstName', 'email'],
            where: {id: usersId }
        })
        .then((users) => {
            if (users) {
                request.users = users;
                response.status(201).json(users);
                return next();
            } else {
                response.status(404).json({error: 'user not found'})
                return next();
            }
        })
        .catch((err) => {
            console.log(err);
            response.status(500).json({error: 'Cannot fetch user'});
        });
    },
    searchOne: (request, response) => {
        // Parameters
        const id = request.params.id;

        models.Users.findOne({
            attributes: [ 'id', 'email', 'firstName', 'lastName', 'role'],
            where: { id: id }
        })
        .then(data => {
            if (data) {
                response.status(200).send(data);
            } else {
            response.status(400).send({
                message: `An error occurred : cannot found user with id=${id}. Maybe user was not found!`
              });
            }
        })
        .catch(err => {
            response.status(400).send({
                message: `An error occurred : could not found user with id=${id}.`
            });
        });
    },
    searchAll: (request, response) => {
        models.Users.findAll({
                attributes: [ 'id', 'email', 'firstName', 'lastName']
            })
        .then(data => {
            if (data) {
                response.status(200).send(data);
            }
        })
        .catch(err => {
            response.status(400).send({
                message: "An error occurred : while retrieving Users."
            });
        });
    },
    delete: (request, response) => {
        // Parameters
        const id = request.params.id;

        models.Users.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
            response.status(200).send({
                    message: "User successfully deleted 😊"
                });
            } else {
                response.status(400).send({
                    message: `An error occurred : cannot delete user with id=${id}.`
                });
            }
        })
        .catch(err => {
            response.status(404).send({
                message: "User with id=" + id + " was not found"
            });
        });
    },
    login: (request, response) => {
        // Parameters
        let email = request.body.email;
        let password = request.body.password;

        // Fields verification
        if (email == "" || password == "") {
            return response.status(400).json({'error': 'missing parameters'})
        }
        models.Users.findOne({
            attributes: [`id`, `email`,`password`, 'firstName'],
            where: { email: email }
        })
        .then((userFound) => {
            if (userFound) {
                bcrypt.compare(password, userFound.password, (errBycrypt, resBycrypt) => {
                    console.log(password,'-------1-----',userFound.password)
                        // return response.status(400).json({ error: `An error occurred : ${userFound.firstName} already logged.`})
                    if (resBycrypt) {
                        // Add token to cookie
                        const token = jwt.sign({ id: userFound.id, role: userFound.role }, "YOUR_SECRET_KEY");
                        let cookieUsers = response.cookie(process.env.TOKEN_NAME, token).status(200).json({message: `${userFound.firstName} is successfully logged  😊 👌`})
                        return cookieUsers;//, response.redirect('/UserHomePage');;
                    } else {
                        return response.status(403).json({error: 'invalid password'})
                    }
                })
            } else {
                return response.status(404).json({error: 'User not exist in DB'})
            }
        })
        .catch((err) => {
            return response.status(500).json({'An error occurred': 'Unable to verify user, maybe invalid email'})
        })
    },
    logout: (request, response) => {
        return response.clearCookie(process.env.TOKEN_NAME).status(200).json({success: "Successfully logged out 😏 🍀"});
    },
}