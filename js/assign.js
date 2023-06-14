const APIRoot = 'https://localhost:7168/api/'

function init(){
    getEmail()
    loadCustomerInfo(getID())
}
async function getEmail(){
    let url = APIRoot+'Customers/'+getID()
    await fetch(url)
        .then((res)=>res.json())
        .then(function (json){
            document.getElementById('email').value = json.email
        })
}

function getID(){
    let array = document.cookie.split('; ')
    let result = []

    array.forEach(
        function (element) {
            if (element.substring(0,10)==='customerID'){
                result = element.split('=')
            }
        }
    )
    if (result[1] === ''){
        return 'none'
    }
    return result[1]
}

async function loadCustomerInfo(id){
    let email = document.getElementById('customerEmail')

    let url = APIRoot+'Customers/'+id

    if (id === 'none'){
        email.innerHTML = 'Failed to load user data'
    }

    await fetch(url)
        .then((res) => res.json())
        .then(function (json) {
            email.innerHTML = json.email
        })
}