const fetch = require('node-fetch');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

// FUNCTIONS //
exports.addUser = async (req, res) => {
    fetch('http://localhost:8000/api/register',{
     // Adding method type
     method: "POST",
     // Adding body or contents to send
     body: JSON.stringify({
        firstName: req.body.fisrtName,
        lastName : req.body.lastName,
        email : req.body.email,
        password  : req.body.password,
     }),
      // Adding headers to the request
    headers: {
        "Content-type": "application/json"
    }
 })
 .then(response => response.json())
 .then(json => {
    if(json.errorMessage){
        console.log('------- front ------', json)
        res.render('register', json)
    }else{
        res.redirect('/');
    }
 })
 
}             

exports.getUserByToken = async (req, res, next) => {
    
    const response = await fetch('http://localhost:8000/api/getUser',{
        headers: {
            'Authorization': localStorage.getItem('token')// Token à récupérer 
        }
     });
    const myJson = await response.json();
    console.log('----User Info---', myJson);
    return next();
    
}
exports.logUser = async (req, res, next) => {

    await fetch("http://localhost:8000/api/login", {

        // Adding method type
        method: "POST",

        // Adding headers to the request
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
          
        // Adding body or contents to send
        body: JSON.stringify({
            email : req.body.email,
            password  : req.body.password,
        }),

    })
  
    // Converting to JSON
    .then((res) => {  
        return res.json() 
    })
    
    // Displaying results to console
    .then(json => {
        console.log('toto', json);
        localStorage.setItem('token', json.token);
        console.log(localStorage.getItem('token'));
        res.render('login', json)
        if(json.token)
            res.redirect('/profile')
    })

    .catch((err) => {
        console.error(err);
        res.render('login', json)
    })

}
 // exports.getAllUsers = async (req, res) => {
    
//     const response = await fetch('http://localhost:8000/api/users');
//     const myJson = await response.json();
//     console.log('myjson :', myJson);
//     console.log('JE SUIS ADMIN',req.admin)

//    if (req.admin.id){
//     res.render('pages/admin/showUsers', {
//         getAllUsers: myJson,
//         admin : req.admin,
//         })
//     }
//     else { 
//         res.redirect('/profile')
//     }
// }
// exports.getUserById = async (req, res) => {
//     console.log(req.params)
//     const response = await fetch('http://localhost:8000/api/user/'+req.params.id); // Id à récupérer en params
//     const myJson = await response.json();
//     console.log('myjson :', myJson);
    
// }   

   
      
   
    
