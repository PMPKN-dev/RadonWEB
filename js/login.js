const APIRoot = 'https://localhost:7168/'

async function login()
{
    //get email from field
    let email = document.getElementById('loginEmail').value

    //get password from field
    let password = document.getElementById('loginPassword').value

    //fetch info from database based on id admin
    let url = APIRoot+'api/Customers/6481afd3af2dcae42ea7369c'
    await fetch(url)
        .then((res)=> res.json())
        .then(function (json){
            //compare info with database
            if(
                json.email === email &&
                json.password === password
            ){
                //if same, create a document.cookie.session that expires in 6 hours
                let expiry = new Date().getTime() +  5 * 60 * 1000 //we love this standard . . . .
                document.cookie = 'adminSession = true; expires '+ expiry
                console.log(document.cookie)
                console.log('success')
                document.location = './table.html'
            } else {
                console.log('failure')
            }
        })


}