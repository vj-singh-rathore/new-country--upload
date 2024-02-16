let containerDetail = document.querySelector('.containerDetail');
let container = document.querySelector('.container')
let submitbtn = document.querySelector('.submitbtn')
let bodytag = document.querySelector("body");
let cards = document.querySelector('.box');
let navbar = document.querySelector(".navbar");
let darkModebtn = document.querySelector('.darkModeBtn')
let searchBar = document.querySelector(".searchBar");

//fetching all data object 
let alldata = [];

async function countries() {
    let r = await fetch("https://restcountries.com/v3.1/all");
    alldata = await r.json();
    createCountryCardsForAll(alldata);

}

function createCountryCardsForAll(alldata) {
    for (data of alldata) {
        generateCards(data);
    }

    addEventsToBox()
}
function addEventsToBox() {
    for (data of alldata) {
        const countryName = data.name.common;
        const countryNameStr = countryName.replaceAll(
            " ", "-").replaceAll('(', '').replaceAll(')', '').replaceAll(',', '')
        try {
            let elem = document.querySelector(`.${countryNameStr}`).addEventListener(
                'click', function () {
                    showDetail(countryName);
                }
            )
        } catch (err) {
            console.log(err, countryName, countryNameStr)
        }
    }
}

countries()
let allCountryClasses = [];
//Making a cards from all data
async function generateCards(data) {
    const flagLink = data.flags.png;
    const countryName = data.name.common;
    const population = data.population;
    const mapLink = data.maps.googleMaps;
    const coatOfArm = data.coatOfArms.png;
    const countryNameStr = countryName.replaceAll(
        " ", "-").replaceAll('(', '').replaceAll(')', '').replaceAll(',', '')
    container.innerHTML += `
        <div class="box ${countryNameStr}">  
            <div class="flag"> 
                <img src="${flagLink}" alt="flag" class="flagImg ">
            </div>  
            <hr>
            <div class="countryName margin">
                <h2 class="country ${countryNameStr}">
                    ${countryName}
                </h2>
            </div>
        
            <h6 class="population margin">
                ${population} People
            </h6>
            <h4 class="mapLink margin">
                <a href="${mapLink}" class="map">Find on Map</a>
            </h4>
            <div class="coa margin">
                <img src="${coatOfArm}" alt="symbol" class="symbol" height="150">
            </div>
        </div>
    `

    allCountryClasses.push(`${countryNameStr}`);



}

function darkMode() {
    let input = document.querySelector('.searchbar').value.toLowerCase();

    if (true) {
        for (country of alldata) {
            if (input.length > 0) {

                if (country.name.common.toLowerCase().includes(input)) {
                    const countryName = country.name.common;

                    const countryNameStr = countryName.replaceAll(
                        " ", "-").replaceAll('(', '').replaceAll(')', '').replaceAll(',', '')
                    // console.log(countryNameStr)
                    document.querySelector(`.${countryNameStr}`).classList.toggle("darkbox");
                }
            } else {
                const countryName = country.name.common;

                const countryNameStr = countryName.replaceAll(
                    " ", "-").replaceAll('(', '').replaceAll(')', '').replaceAll(',', '')
                // console.log(countryNameStr)
                document.querySelector(`.${countryNameStr}`).classList.toggle("darkbox");
            }
        }
    }

    bodytag.classList.toggle('darkMode');
    navbar.classList.toggle('darknav');
    let detailBox = document.querySelector('.detailBox')
    if (detailBox != null) {
        detailBox.classList.toggle("darkbox")
    }
    if (darkModebtn.textContent == '🔆Light Mode') {
        darkModebtn.textContent = '☾ Dark Mode';
    } else {
        darkModebtn.textContent = '🔆Light Mode';
    }

}


function search_card() {
    let input = document.querySelector('.searchbar').value.toLowerCase();

    if (input.length > 0) {
        container.innerHTML = ''
        for (country of alldata) {
            if (country.name.common.toLowerCase().includes(input)) {
                // console.log(country)
                generateCards(country);

            }
        }
        for (data of alldata) {
            if (data.name.common.toLowerCase().includes(input)) {

                const countryName = data.name.common;
                const countryNameStr = countryName.replaceAll(
                    " ", "-").replaceAll('(', '').replaceAll(')', '').replaceAll(',', '')
                try {
                    let elem = document.querySelector(`.${countryNameStr}`).addEventListener(
                        'click', function () {
                            showDetail(countryName);
                        }
                    )
                } catch (err) {
                    console.log(err, countryName, countryNameStr)
                }
            }
        }
    } else {
        createCountryCardsForAll(alldata);
    }
}

function filterCountryData(query) {
    // console.log("filter")
    // console.log(query)
    let countryData = null
    for (country of alldata) {
        const countryName = country.name.common;

        if (countryName == query) {
            countryData = country;
            break;
        }
        else {


        }
    }
    return countryData
}

// click show details of country individual
function showDetail(queryCountryName) {
    // console.log(queryCountryName)
    container.style.display = "none";
    country = filterCountryData(queryCountryName)
    const flagLink = country.flags.png;
    const countryName = country.name.common;
    const population = country.population;
    const mapLink = country.maps.googleMaps;
    const capital = country.capital[0];
    const continents = country.continents;
    const region = country.region;
    const subregion = country.subregion;
    const lang = Object.values(country.languages);
    const borders = country.borders;
    const countryNameStr = countryName.replaceAll(
        " ", "-").replaceAll('(', '').replaceAll(')', '').replaceAll(',', '')


    containerDetail.innerHTML = `

        <div class="detailBox ">
            <div>
                <img src="${flagLink}" alt="image" class="flag2">
            </div>

            <div class="countryNameDetail">
                <h1 class="country">
                    ${countryName}
                </h1>
            </div>
            <div class="detail">
                <h4 class="population">
                    Population: ${population}
                </h4>
                <h4 class="region">
                    Region: ${region}
                </h4>
                    <h4 class="subregion">
                        Sub Region: ${subregion}
                </h4>
                <h4 class="capital">
                    Capital: ${capital}
                </h4>
            </div>

            <div class="detail">
                <h4 class="country">
                    Continents: ${continents}
                </h4>
                <h4 class="population">
                    Languages: ${lang}
                </h4>
                <h4 class="borders">
                    Borders: ${borders}
                </h4>
                <h4 class="mapLink">
                    <a href="${mapLink}" class="map">Find on Map</a>
                </h4>
            </div>
        </div>
    <button class="backbtn">Back</button>

    `

    let backbtn = document.querySelector('.backbtn');
    backbtn.addEventListener('click', back);
    let detailBox = document.querySelector('.detailBox')


    if (bodytag.classList.contains("darkMode")) {
        console.log("changed the color")
        detailBox.classList.toggle("darkbox")
    }

    // document.querySelector('.detailBox').classList.toggle("darkbox")

}



function back() {
    containerDetail.innerHTML = "";
    container.style.display = "flex";
}

// submitbtn.addEventListener("click", search_card)
// searchBar.addEventListener("onkeyup", search_card)
darkModebtn.addEventListener('click', darkMode)