function logout(){
    let expired = new Date().getTime() -  5 * 60 * 1000 //we love this standard . . . .

    document.cookie = 'adminSession = false; expires: ' +expired
    document.location = './login.html'
}