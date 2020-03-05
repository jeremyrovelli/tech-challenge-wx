const request = require('supertest');
const appid = "21130a6913e49062f45a8d10cc2c98cb"

function determineNextMondaydate(){
    var d = new Date();
    d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7);
    return formatDate(d);
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function getTemperaturesForDesiredDate(weatherReponse, desiredDate){
    const listLength = weatherReponse.body.list.length
    let temperatures = []
    for (i=0;i<listLength;i++){
        const weatherForecast = weatherReponse.body.list[i]
        const formatedDate = weatherForecast.dt_txt.substring(0, 10)
        if (formatedDate == desiredDate){
            temperatureIntKelvin = weatherForecast.main.temp
            temperatureCelcius = temperatureIntKelvin - 273.15
            temperatures.push(temperatureCelcius)
        }
    }
    return temperatures
}

async function getWeather(cityToLookFor){
    const weatherReponse = await request("api.openweathermap.org/data/2.5/").get("forecast?q="+cityToLookFor+"&appid="+appid)
    return weatherReponse;
} 

function checkTemperaturesGreaterThan10(temperatures){
    let isTemperatureGreaterThan10 = true
         for (i=0;i<temperatures.length;i++){
            if (temperatures[i] < 10){
                isTemperatureGreaterThan10 = false
            }
        } 
    return isTemperatureGreaterThan10
}

module.exports = { determineNextMondaydate, getTemperaturesForDesiredDate, checkTemperaturesGreaterThan10, getWeather};
