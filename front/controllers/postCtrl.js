const fetch = require('node-fetch');


// FUNCTIONS //
exports.getAllPosts = async (req, res) => {

    const response = await fetch('http://localhost:8000/api/getAllPosts');
    const myJson = await response.json();
    console.log( myJson); 

    return res.render('home',{
        allPosts : myJson,
    })

}  

// exports.createPost = async (req, res) => {
//     console.log(req.query.id)
//     const response = await fetch('http://localhost:8000/api/createPost'+req.query.id);
//     const myJson = await response.json();
//     console.log('createPost:', myJson); 

//     return res.render('home', {
//         createPost: myJson
        
//     });

// }

// exports.createPost = async (req, res) => {

//     // POST request using fetch()
//     fetch("http://localhost:8000/api/createPost", {
      
//     // Adding method type
//     method: "POST",
      
//     // Adding body or contents to send
//     body: JSON.stringify({
//         attachment : req.file.originalname,
//         content : req.body.content,
       
//     }),
//     // Adding headers to the request
//     headers: {
//         "Content-type": "application/json; charset=UTF-8"
//     }
// })
  
// // Converting to JSON
// .then(response => response.json())
  
// // Displaying results to console
// .then(json => console.log(json))

// res.redirect('/adallcar')
  
// }

   
   