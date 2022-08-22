// Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncLib = require('async');
const models = require('../models');
const cookieParser = require('cookie-parser');

// REGEX
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[æÆÐ!@#&$()[{.\]\}-]).{5,255}$/

//Routes
module.exports = {
    register: (request, response) => {
       
        // Parameters
        let lastName = request.body.lastName;
        let firstName = request.body.firstName;
        let email = request.body.email;
        let password = request.body.password;

        console.log('-----HOLA----', request.body);
        // Fields verification
        if (lastName == "" || firstName == "" || email == "" || password == "") {
            return response.status(400).json({errorMessage: 'Missing parameters'});
        }
        
        if (!EMAIL_REGEX.test(email)) { 
            console.log(email)
            return response.status(400).json({errorMessage: 'An error occured : email is not valid'});
        }
        
        if (!PASWORD_REGEX.test(password)) {
            return response.status(400).json( {errorMessage: 'An error occured : password invalid (must length 4 - 18 and include 1 number'});
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
                    console.log('-------------', err);
                    return response.status(400).json( {errorMessage: 'An error occured hamid'});
                });
            },
            (userFound, done) => {
                if (!userFound) {
                    bcrypt.hash(password, 5, (err, bcryptedPassword) => { done(null, userFound, bcryptedPassword) })
                } else { 
                    response.status(409).json( {errorMessage: 'user already exist.'});
                }
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
                    return response
                    .status(500)
                    .json( {errorMessage: 'An error occurred : unable to verify user'});
                });
            }
        ],
        (newUser) => {
            if(newUser) {
                return response
                    .status(201)
                    .json({successMessage: 'User successfully created'});
               
            } else {
                return response
                    .status(400)
                    .json({errorMessage: 'An error occurred : user already exist.'});
            }
        }
        )
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
                if(userFound) {
                    userFound.update({
                        lastName: (lastName ? lastName : userFound.lastName),
                        firstName: (firstName ? firstName : userFound.firstName),
                        email: (email ? email : userFound.email),
                        password: (password ? password : userFound.password)
                    })

                    .then((userFound) => {
                        done(userFound);
                    })
                    .catch((err) => {
                        response.status(400).json({ 'error': 'An error occurred' });
                    });
                }
                else {
                  response.status(404).json({ 'error': 'An error occurred' });
                }
            },
        ],
            (userFound) => {
                if (userFound) {
                    response.status(200).json({'success': 'User successfuly modified'})
                } else {
                    response.status(400).json({ 'error': 'An error occurred' })
                } 
            }
        )          
    },
    searchOne: (request, response) => {
        // Parameters
        const id = request.params.id;

        models.Users.findOne({
            attributes: [ 'id', 'email', 'firstName', 'lastName'],
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
    searchAllUsers: (request, response) => {
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
        console.log(request.body);
        // Fields verification
        if (email == "" || password == "") {
            return response.status(400).render('login', {errorMessage: 'Missing parameters'});

        }

        models.Users.findOne({
            attributes: [`id`, `email`,`password`],
            where: { email: email}
        })
        .then((userFound) => {
            if (userFound) {
                bcrypt.compare(password, userFound.password, (errBycrypt, resBycrypt) => {
                    if (resBycrypt) {
                        // Add token to cookie
                        const token = jwt.sign({ id: userFound.id/*, role: userFound.role */}, "YOUR_SECRET_KEY");
                        console.log(token)
                        response
                            .cookie("access_token", token
                           )
                            .status(200)
                            .json( {successMessage: 'Logged in successfully 😊 👌', 'token' : token})
                    } else {
                        console.log(errBycrypt)
                        response.status(403)
                        //.render('login', {errorMessage: 'invalid password'})
                        .json({error: 'invalid password'})
                    }
                    // if (successMessage) {
                    //     response.redirect('/home')
                    // }
                })
            } else {
                return response.status(404)
                //.render('login', {errorMessage: 'user not exist in DB'})
                .json({error: 'user not exist in DB'})
            }
        })
        .catch((err) => {
            return response.status(500)
            //.render('login', {errorMessage: 'unable to verify user, maybe invalid email'})
            .json({'An error occurred': 'unable to verify user, maybe invalid email'})
        })
    },
    logout: (request, response) => {
        console.log('je suis dedans ');
        localStorage.clear();
        //return response.clearCookie('access_token').status(200).json({success: "Successfully logged out 😏 🍀"})
    }
    // loggedIn: (request, response) => {
    //     return response.clearCookie('access_token').status(200).json({success: "Successfully logged out 😏 🍀"})
    // }
}