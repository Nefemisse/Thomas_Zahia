// Import
const express = require('express');
const apiRouter = require('./route/apiRouter').router;
const cookieParser = require('cookie-parser');
const adminRouter = require('./route/adminRouter').router;
const path = require('path');
const postsCtrl = require('./controleur/posts.ctrl');
const myProfile = require('./controleur/myProfile');
const usersCtrl = require('./controleur/usersCtrl');

// Instanciation server
const server = express();

// Set view engine to ejs
server.set('view engine', 'ejs');
server.set('view', path.join(__dirname, 'views'));

// Body parsing via express
server.use(express.urlencoded({extended: true}));
server.use(express.json());
server.use(cookieParser());

// Config routes
// Home
server.get('/', (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    response.status(200).send('Salut les connards')
});
// Profil
server.get('/profil', (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    response.status(200).send('Salut le profil')
});
// Article
server.get('/posts', (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    response.status(200).send('Salut les posts')
});

// Api Route
server.use('/api', apiRouter);

server.get('/api', function(request, response){
    var token = request.query.token;
    console.log(token);
    jwt.verify(token, process.env.TOKEN_NAME, (err, decoded) => {
      if(!err){
        var secrets = jwt.sign({ id: userFound.id, role: userFound.role }, "YOUR_SECRET_KEY");
        response.json(secrets);
      } else {
        response.send(err);
      }
    })
  })

server.get('/', myProfile.loggedIn, postsCtrl.searchAll);
server.get('/profil', myProfile.loggedIn, usersCtrl.getUserMe); // fonction ?

//Admin Router
server.use('/api/admin', adminRouter);

//Listener
const start = (port) => {
    try {
        server.listen(port || process.env.PORT_SECOUR, () => {
            console.log(`Api up and running at: http://localhost:${port}`);
        })
    } catch (err) {
        console.log(err);
        process.exit();
    }
};
start(process.env.PORT);
