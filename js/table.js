const APIRoot = 'https://localhost:7168/'

let PageNum = 0;


async function populateTables() {

    let url = APIRoot+'api/Customers/'
    document.getElementById('TableBody').replaceChildren()

    document.getElementById('currentPageNum').innerHTML = (PageNum+1).toString()


    if(document.cookie.substring(13)!=='true'){ return }

    await fetch(url)
        .then((res)=>res.json())
        .then(function (json){

            let i= PageNum * 10; //customer iterator

            while(i<json.length)
            {
                let j = 0 //loggers iterator
                let dataloggers = []
                while(j<json[i].dataloggers.length) //creates a composite element to display all loggers
                {
                    dataloggers[j] = json[i].dataloggers[j].serialnumber
                    j++
                }

                if(json[i].id === '6481afd3af2dcae42ea7369c'){ //skips admin ID
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

function prevPage(){
    PageNum -=1
    populateTables()
}

function nextPage(){
    PageNum +=1
    populateTables()
}

async function countPages(){

    let url = APIRoot+'api/Customers/'

    let i = 0


    await fetch(url)
        .then((res)=>res.json())
        .then(function (json){
            while(i<json.length)
            {
                i++
            }
        })

    document.getElementById('totalPageNum').innerHTML = (Math.round(i/10)+1).toString()


}

function createTableElement(ID,email,loggers) {
    let table = document.getElementById('TableBody')

    let row = document.createElement('tr')

    let emailCol = document.createElement('td')
    emailCol.setAttribute('style','background: mintcream')
    emailCol.innerHTML = email

    let IDCol = document.createElement('td')
    IDCol.setAttribute('style','background: mintcream')
    IDCol.innerHTML = ID


    let loggersCol = document.createElement('td')
    loggersCol.setAttribute('style','background: mintcream')
    loggersCol.innerHTML = loggers

    row.append(emailCol ,IDCol ,loggersCol)
    table.append(row)


}
