// Import
const { request, response } = require('express');
const express = require('express');
const apiRouter = require('./route/apiRouter').router;
const path = require('path');




// Instanciation server
const server = express();


// body parsing via express
server.use(express.urlencoded({extended: true}));
server.use(express.json());





// const url='http://localhost:8000/api/users/';

// async function getUsers(){
//     const response = await fetch(url)
//     const data = await response.json();
//     console.log(data)
// }
// getUsers();


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

