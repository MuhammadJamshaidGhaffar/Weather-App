let weatherApi = "bce9df8eb2ee5bc3e5efe4b20bee8458";
let weatherBaseEndpoint =  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid="+      weatherApi;

let searchInp = document.querySelector('.weather-search');
let city = document.querySelector('.weather-city');
let day = document.querySelector('.weather-day');
let humidity = document.querySelector('.weather-indicator-humidity>.value');
let wind = document.querySelector('.weather-indicator-wind>.value');
let pressure = document.querySelector('.weather-indicator-pressure>.value');
let image = document.querySelector('.weather-image');
let temperature = document.querySelector('.weather-temp .value');


let forecastBaseEndpoint = "https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=" + weatherApi;
let forecastBlock = document.querySelector('.weather-forecast');

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

let getForecastByCityName = async (cityName) =>
{
    try{

        let endpoint = forecastBaseEndpoint +"&q=" + cityName;
        let data = await fetch(endpoint);
        let weather = await data.json();
        return weather;
    }
    catch(err){
        console.log("In Function getForecastByCityName()  Error is : " + err);
    }
}


searchInp.addEventListener("keydown" ,async (e) =>{
    if(e.key == "Enter"){
        console.log("Proceesing Weather Request");
        let weather = await getWeatherByCityName(searchInp.value);
        console.log(weather);
        updateCurrentWeather(weather);

        console.log("Processing Forecast Request");
        let forecast = await getForecastByCityName(searchInp.value);
        console.log(forecast);

        let forecastList = forecast.list;
        let daily  = [];
        console.log("Getting 12:00 forecast list")
        forecastList.forEach(day => {
            let date = new Date(day.dt_txt.replace(" " , "T"));
            if(date.getHours() == 12)
            {
                console.log(date);
                daily.push(day);
            }
        });
        console.log(daily);
        updateForecast(daily);
    }
})

function updateCurrentWeather (data){
    city.textContent = data.name + ', ' + data.sys.country;
    day.textContent = getDayOfWeek();
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;
    wind.textContent = getWindDirection(data.wind.deg) + " , " + data.wind.speed;
    temperature.textContent = data.main.temp > 0 ? "+" + Math.round(data.main.temp) : Math.round(data.main.temp) ;

}

function getDayOfWeek()
{
    let date = new Date();
    return date.toLocaleDateString('en-EN' , {'weekday' : 'long'});
}

function getWindDirection (deg){
    if(deg > 330 && deg <= 30)
        return "North";
    else if(deg > 30 && deg <= 60)
        return "North-East";
    else if(deg > 60 && deg <=120)
        return "East";
    else if(deg > 120 && deg <= 150)
        return "South-East";
    else if(deg > 150 && deg <= 210)
        return "South";
    else if(deg > 210 && deg <= 240)
        return "South-West";
    else if(deg > 240 && deg <= 300)
        return "West";
    else if(deg > 300 && deg <= 330)
        return "North-West";
}

function updateForecast(forecast){
    forecastBlock.innerHTML = '';
    forecast.forEach(day => {
        let iconUrl = "http://openweathermap.org/img/wn/"+ day.weather[0].icon+"@2x.png";
    });
}