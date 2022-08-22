// Import
const express = require('express');
const apiRouter = require('./route/apiRouter').router;
const adminRouter = require('./route/adminRouter').router;
const cookieParser = require('cookie-parser');
const path = require('path');

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
// Api Route
server.use('/api', apiRouter);

//Admin Router
server.use('/api', adminRouter);

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
