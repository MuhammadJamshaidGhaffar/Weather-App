let weatherApi = "bce9df8eb2ee5bc3e5efe4b20bee8458";
let weatherBaseEndpoint =  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid="+      weatherApi;

let searchInp = document.querySelector('.weather-search');
let city = document.querySelector('.weather-city');
let day = document.querySelector('.weather-day');
let humidity = document.querySelector('.weather-indicator-humidity>.value');
let wind = document.querySelector('.weather-indicator-wind>.value');
let pressure = document.querySelector('.weather-indicator-pressure>.value');
let image = document.querySelector('.weather-image');
let temperature = document.querySelector('.weather-temp>.value');



let getWeatherByCityName =  async (cityName) =>
{
    try{

        let endpoint = weatherBaseEndpoint +"&q=" + cityName;
        let data = await fetch(endpoint);
        let weather = await data.json();
        return weather;
    }
    catch(err){
        console.log("In Function getWeatherByCityName()  Error is : " + err);
    }
}

// getWeatherByCityName("New York");

searchInp.addEventListener("keydown" ,async (e) =>{
    if(e.key == "Enter"){
        console.log("Proceesing");
        let weather = await getWeatherByCityName(searchInp.value);
        console.log(weather);
        updateCurrentWeather(weather);
    }
})

function updateCurrentWeather (data){
    city.textContent = data.name + ', ' + data.sys.country;
    day.textContent = getDayOfWeek();
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;
}

function getDayOfWeek()
{
    let date = new Date();
    return date.toLocaleDateString('en-EN' , {'weekday' : 'long'});
}

funtion get