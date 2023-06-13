const APIRoot = 'https://localhost:7168/api'

async function populateData(){
    //async call to load info
    await loadCustomerInfo()
        //first hardcode, then make load from cookie
    //async call to populate table
    await populateTable()


}

async function loadCustomerInfo(){
    let email = document.getElementById('customerEmail')

    email.innerHTML = 'placeholder text'
}

async function populateTable(){
    createTableElement('testing','the waters')
}


function createTableElement(first,second) {
    let table = document.getElementById('tableBody')

    let row = document.createElement('tr')

    let firstCol = document.createElement('td')
    firstCol.setAttribute('style','background: mintcream')
    firstCol.innerHTML = second

    let secondCol = document.createElement('td')
    secondCol.setAttribute('style','background: mintcream')
    secondCol.innerHTML = first


    row.append(firstCol ,secondCol)
    table.append(row)
}

