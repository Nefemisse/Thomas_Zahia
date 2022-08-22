const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');
// const LocalStorage = require('node-localstorage').LocalStorage;
// const localStorage = new LocalStorage('./scratch');


// FUNCTIONS //
exports.getAllPosts = async (req, res) => {

    const response = await fetch('http://localhost:8000/api/getAllPosts');
    const myJson = await response.json();
    console.log( myJson); 

    return res.render('home',{
        allPosts : myJson
    })
}  


exports.createPost = async (req, res) => {
      console.log( '-----hello---',req.body)
    // POST request using fetch()
    fetch("http://localhost:8000/api/createPost", {
      
    // Adding method type
    method: "POST",  
    // Adding body or contents to send
    body: JSON.stringify({
        attachments : req.body.attachments,
        content : req.body.content, 
          
         
    }),
    // Adding headers to the request
    headers: {
        "Content-type": "application/json"
    }
})
  
// Converting to JSON
.then(response => response.json())
  
// Displaying results to console
.then(json => console.log(json))

res.redirect('/home')
  
}


exports.deletePost = async (req, res) => {
console.log('idPsot', req.query.id);
    const response = await fetch('http://localhost:8000/api/deletePost/?id='+ req.query.id , {
        method: 'DELETE',
    });
    const myJson = await response.json();
      console.log( myJson); 

    res.redirect('/home')
}
// exports.updatePost = async (req, res) => {

 
//     await fetch("http://localhost:8050/api/putPost/?id="+req.query.id,{
          
//         // Adding method type
//         method: "PUT",
          
//         // Adding body or contents to send
//         body: JSON.stringify({
//             attachments: req.attachments,
//             content : req.body.content,
         
//         }),
          
//         headers: {
//             "Content-Type": "application/json; charset=UTF-8"
//         }
//     })
      
//     // Converting to JSON
//     .then(response => response.json())
      
//     // Displaying results to console
//     .then(json => console.log(json))
    
//     res.redirect('/home')
//     }