// Import
const { request, response } = require('express');
const express = require('express');
const apiRouter = require('./route/apiRouter').router;
const cookieParser = require('cookie-parser');
const adminRouter = require('./route/adminRouter').router;
const path = require('path');

// Instanciation server
const server = express();

// Set view engine to ejs
server.set('view engine', 'ejs');
server.set('view', path.join(__dirname, 'views'));

// body parsing via express
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

// User Router
server.use('/api', apiRouter);
//Admin Router
server.use('/api/admin', adminRouter);

//Listener
const start = (port) => {
    try {
        server.listen(port || 8088, () => {
            console.log(`Api up and running at: http://localhost:${port}`);
        })
    } catch (err) {
        console.log(err);
        process.exit();
    }
};
start(8000);

