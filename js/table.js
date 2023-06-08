const APIRoot = 'https://localhost:7168/'


async function populateTables() {

    let url = APIRoot+'api/Customers/'
    document.getElementById('TableBody').replaceChildren()

    if (document.getElementById('testInput').value!=='admin'){
        return
    }
    await fetch(url)
        .then((res)=>res.json())
        .then(function (json){
            let i=0;
            while(i<json.length)
            {
                let j = 0
                let dataloggers = []
                while(j<json[i].dataloggers.length)
                {
                    dataloggers[j] = json[i].dataloggers[j].serialnumber
                    j++
                }

                if(json[i].email === 'admin'){
                    //skip
                } else{
                createTableElement(
                    json[i].id,
                    json[i].email,
                    dataloggers.toString().replace(',','; ')
                )
                }i++
            }
        })
}

function createTableElement(ID,email,loggers) {
    let table = document.getElementById('TableBody')

    let row = document.createElement('tr')

    let IDCol = document.createElement('td')
    IDCol.setAttribute('style','background: mintcream')
    IDCol.innerHTML = ID

    let emailCol = document.createElement('td')
    emailCol.setAttribute('style','background: mintcream')
    emailCol.innerHTML = email

    let loggersCol = document.createElement('td')
    loggersCol.setAttribute('style','background: mintcream')
    loggersCol.innerHTML = loggers

    row.append(IDCol,emailCol,loggersCol)
    table.append(row)


}
