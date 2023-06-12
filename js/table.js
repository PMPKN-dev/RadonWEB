const APIRoot = 'https://localhost:7168/'

//initial page number
let pageNum = 0;
// a toggle for the table which defines whether the table looks up customers or non-assigned dataloggers
let tableBool = true;

/**
 * Populates the table based on the current value of tableBool
 * Additionally, sets table details and page count
 * @returns {Promise<void>}
 */
async function populateTables(){
    let url = APIRoot+'api/Customers/'

    setTableDetails()
    countPages()


    document.getElementById('TableBody').replaceChildren()

    document.getElementById('currentPageNum').innerHTML = (pageNum+1).toString()

    if(document.cookie.substring(13)!=='true'){ return }


    if (tableBool){


        url = APIRoot+'api/Customers/'

        await fetch(url)
            .then((res)=>res.json())
            .then(function (json){

                let i= pageNum * 10; //customer iterator

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
    else if (!tableBool){

        url = APIRoot+'api/Dataloggers/'

        await fetch(url)
            .then((res)=>res.json())
            .then(function (json){

                let i= pageNum * 10; //customer iterator
                    createTableElement(
                        'Unassigned',
                        'Device',
                        json[i].serialnumber
                        )
                i++
            })
    }
}

function toggleTable(){
    tableBool = !tableBool
    populateTables()
}

function prevPage(){
    pageNum -=1
    populateTables()
}

function nextPage(){
    pageNum +=1
    populateTables()
}

/**
 * Counts total amount of pages based on an API call based on tableBool
 * @returns {Promise<void>}
 */
async function countPages(){
    let url = APIRoot

    if (tableBool){
        url +='api/Customers/'
    } else if (!tableBool){
        url += 'api/Dataloggers/'
    }

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

/**
 * Filters the table based on an input from the 'tableSearch' element.
 * Distinguishes fully numeric and mixed inputs and searches the corresponding Column accordingly
 */
function filterTable() {
    var input, filter, table, tr, td, i, txtValue;

    input = document.getElementById("tableSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("TableBody");

    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {

        const regex = /[0-9]+$/;

        if(input.value.match(regex)){
            td = tr[i].getElementsByTagName("td")[2];
        } else {
            td = tr[i].getElementsByTagName("td")[0];
        }

        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}


function setTableDetails(){
    let T1 = document.getElementById("TableTitle1")
    let T2 = document.getElementById("TableTitle2")
    let T3 = document.getElementById("TableTitle3")
    let S = document.getElementById("tableSearch")

    if (tableBool){
        T1.innerHTML = 'E-Mail'
        T2.innerHTML = 'ID'
        T3.innerHTML = 'Loggers'
        S.disabled = false

    } else if(!tableBool){
        T1.innerHTML = 'Device'
        T2.innerHTML = 'Status'
        T3.innerHTML = 'ID'
        S.disabled = true
    }
}

/**
 * Creates a row of data in the table with given params
 * @param first
 * @param second
 * @param third
 */
function createTableElement(first,second,third) {
    let table = document.getElementById('TableBody')

    let row = document.createElement('tr')

    let firstCol = document.createElement('td')
    firstCol.setAttribute('style','background: mintcream')
    firstCol.innerHTML = second

    let secondCol = document.createElement('td')
    secondCol.setAttribute('style','background: mintcream')
    secondCol.innerHTML = first


    let thirdCol = document.createElement('td')
    thirdCol.setAttribute('style','background: mintcream')
    thirdCol.innerHTML = third

    row.append(firstCol ,secondCol ,thirdCol)
    table.append(row)
}
