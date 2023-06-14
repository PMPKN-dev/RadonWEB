const APIRoot = 'https://localhost:7168/api/'


async function populateData(){

    let id = getID()

    //async call to load info
    await loadCustomerInfo(id)
        //first hardcode, then make load from cookie
    //async call to populate table
    await populateTable(id)
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

async function populateTable(id){

    let url = APIRoot+'Customers/'+id

    await fetch(url)
        .then((res)=>res.json())
        .then(function (json){

            for(let i = 0; i<json.dataloggers.length;i++) {
                createTableElement(json.dataloggers[i].id,json.dataloggers[i].location,json.dataloggers[i].name)
            }

        })

}


function createTableElement(first,second,third) {
    let table = document.getElementById('tableBody')

    let row = document.createElement('tr')

    let firstCol = document.createElement('td')
    firstCol.setAttribute('style','background: mintcream')
    firstCol.innerHTML = first

    let secondCol = document.createElement('td')
    secondCol.setAttribute('style','background: mintcream')
    secondCol.innerHTML = second

    let thirdCol = document.createElement('td')
    thirdCol.setAttribute('style','background: mintcream')
    thirdCol.innerHTML = third


    row.append(firstCol ,secondCol,thirdCol)
    table.append(row)
}

