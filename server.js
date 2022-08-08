// Import
const { request, response } = require('express');
const express = require('express');
const apiRouter = require('./route/apiRouter').router;
const cookieParser = require('cookie-parser');

// Instanciation server
const server = express();

// body parsing via express
server.use(express.urlencoded({extended: true}));
server.use(express.json());
server.use(cookieParser());

//config routes
server.get('/', (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    response.status(200).send('Salut les connards')
});

server.use('/api', apiRouter);

//Listener
const start = (port) => {
    try {
        server.listen(port, () => {
            console.log(`Api up and running at: http://localhost:${port}`);
        })
    } catch (err) {
        console.log(err);
        process.exit();
    }
};
start(8000);

