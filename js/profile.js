const APIRoot = 'https://localhost:7168/api/'
const customerID = '648812cefc100840f964d879'

async function populateData(){
    //async call to load info
    await loadCustomerInfo()
        //first hardcode, then make load from cookie
    //async call to populate table
    await populateTable()


}

async function loadCustomerInfo(){
    let email = document.getElementById('customerEmail')

    let url = APIRoot+'Customers/'+customerID

    await fetch(url)
        .then((res) => res.json())
        .then(function (json) {
            email.innerHTML = json.email
        })

}

async function populateTable(){

    let url = APIRoot+'Customers/'+customerID

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

