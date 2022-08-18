const fetch = require('node-fetch');


// FUNCTIONS //
exports.getPostAll = async (req, res) => {

    const response = await fetch('http://localhost:8000/api/getAllPost');
    const myJson = await response.json();
    console.log( myJson); 

    return res.render('home',{
        allPosts : myJson,
    })

}                  