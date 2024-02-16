
let container = document.querySelector('.container');
let userInput = prompt("Enter Country Name?");
let bodytag = document.querySelector("body");
let cards = document.querySelectorAll('.box');
let navbar = document.querySelector(".navbar");
let darkModebtn = document.querySelector('.darkModeBtn')


async function detail() {
    let result = await fetch(`https://restcountries.com/v3.1/name/${userInput}`);
    let resp = await result.json();
    console.log(resp);
    let ind = resp.length - 1;
    const flagLink = resp[ind].flags.png;
    const countryName = resp[ind].name.common;
    const population = resp[ind].population;
    const mapLink = resp[ind].maps.googleMaps;
    const capital = resp[ind].capital[0];
    const continents = resp[ind].continents;
    const region= resp[ind].region;
    const subregion=resp[ind].subregion;
    const languages = resp[ind].languages;
    const lang= Object.values(languages)
    const borders= resp[ind].borders;
    // console.log(ind)
    // console.log(flagLink)
    // console.log(countryName)
    // console.log(population)
    // console.log(mapLink)
    // console.log(capital)
    // console.log(borders)
    // console.log(region)
    // console.log(subregion)

    // console.log(languages)
    console.log(lang)

    container.innerHTML += `
    <div class="box">
                <div>
                    <img src="${flagLink}" alt="image" class="flag">
                </div>

                <div class="countryName">
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
            </div>`

}

detail();

function darkMode() {
    bodytag.classList.toggle('darkMode');
    navbar.classList.toggle('darknav');
    cards.classList.toggle('darkbox')

}

darkModebtn.addEventListener('click', darkMode)
