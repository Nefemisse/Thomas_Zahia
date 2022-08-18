const getUsers = async () => {
    let Users = await fetch('http://localhost:8080/api/users/')
    .then(data => data.json())
    .then(json => console.log(json))
} 
getUsers()

//    const url='http://localhost:8080/api/users/';

// async function getUsers(){
//     const response = await fetch(url)
//     const data = await response.json();
//     console.log(data)
//     // const info = data.map(data =>  data.lastName );
//     // console.log(info)
// }
// getUsers();


// getUsers()