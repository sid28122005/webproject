const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');

const getInfo = async(event) =>{
    event.preventDefault();
    let cityval = cityName.value;

    if(cityval === ""){
        city_name.innerText = 'plz write cityname before search';
        datahide.classList.add('data_hide');
    }
    else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&appid=e4526e00f492f14030df25667b65dec5`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name} , ${arrData[0].sys.country}`;
            temp_real_val.innerText = parseInt((arrData[0].main.temp) - 273.15);
            temp_status.innerText = arrData[0].weather[0].main;

            const tempMood = arrData[0].weather.main;

            //condition to check sunny or cloudy
            if (tempMood == "Sunny") { 
                temp_status.innerHTML =
                "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rainy") {
                temp_status.innerHTML =
                "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML =
                "<i class='fas  fa-sun' style='color:#eccc68;'></i>";
            }

            datahide.classList.remove('data_hide');

        }
        catch{
            city_name.innerText = 'plz enter the city name properly';
            datahide.classList.add('data_hide');
        }
        
    }
}

submitBtn.addEventListener('click', getInfo);